import test, { Page, expect } from "@playwright/test";

const userName = 'seleniumpom@outlook.com';
const password = '&pwZhcuEFZ*44z';

const loginPageTitle = 'Log In — WordPress.com';
const allPostsPageTitle = 'Posts ‹ Selenium POM Practice Site — WordPress';
const addNewPostPageTitle = 'Add New Post ‹ Selenium POM Practice Site — WordPress';

const blogTitle = 'Some dummy blog title';
const blogContent = 'Some dummy blog content';

test.beforeEach('Login to application', async ({ page }) => {
    await page.goto('/wp-admin/edit.php');
    await expect(page).toHaveTitle(loginPageTitle);
    await page.getByLabel('Email Address or Username').fill(userName);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveTitle(allPostsPageTitle);
    expect(page.url()).toContain('edit');
})

test('Verify create a new post', async ({ page }) => {
    let count;
    await getCount(page).then(data => {
        count = data;
    });

    await page.locator('#split-page-title-action').getByRole('link', { name: 'Add New Post' }).click();
    await expect(page).toHaveTitle(addNewPostPageTitle);
    expect(page.url()).toContain('post-new');

    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title').click();
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title').fill(blogTitle);
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add default block').click();
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Empty block; start writing or').fill(blogContent);

    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
    await page.goto('/wp-admin/edit.php');
    await page.waitForTimeout(2000);
    await page.reload();

    let count2;
    await getCount(page).then(data => {
        count2 = data;
    });

    expect(+count2).toBeGreaterThan(+count);
})

test('Verify editing a post', async ({ page }) => {
    let count;
    await getCount(page).then(data => {
        count = data;
    });

    await page.locator('xpath=//tbody[@id=\'the-list\']/tr[1]/th/input').hover();
    await page.locator('css=span[class=\'edit\']').first().click();
    expect(page.url()).toContain('action=edit');
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title').click();
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title').fill('Some dummy title edited');
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Block: Paragraph').click();
    await page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Block: Paragraph').fill('Some dummy content edited');
    await page.getByRole('button', { name: 'Update' }).click();
    await page.goto('/wp-admin/edit.php');
    
    let count2;
    await getCount(page).then(data => {
        count2 = data;
    });

    expect(+count2).toBe(+count);
})

test('Verify deleting a post', async({page}) => {
    let count;
    await getCount(page).then(data => {
        count = data;
    });

    await page.locator('xpath=//tbody[@id=\'the-list\']/tr[1]/th/input').hover();
    await page.locator('css=span[class=\'trash\']').first().click();
    
    let count2;
    await getCount(page).then(data => {
        count2 = data;
    });

    expect(+count2).toBeLessThan(+count);
})

async function getCount(page: Page): Promise<number> {
    const text = await page.locator('css=li[class=\'all\'] a span').textContent() as string;
    return +text.replace('(', '').replace(')', '');
}