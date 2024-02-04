import test, { expect } from "@playwright/test";
import { LoginPage } from "./../pages/login-page";
import { AllPostsPage } from "./../pages/all-posts-page";
import { CreatePostPage } from "./../pages/create-post-page";
import { EditPostPage } from "./../pages/edit-post-page"

const userName = 'seleniumpom@outlook.com';
const password = '&pwZhcuEFZ*44z';

test.describe('Posts Tests with POM', () => {

    let loginPage: LoginPage;
    let allPostsPage: AllPostsPage;
    let createPostPage: CreatePostPage;
    let editPostPage: EditPostPage;

    test.beforeEach('Login to app', async ({ page }) => {
        loginPage = new LoginPage(page);
        allPostsPage = new AllPostsPage(page);
        createPostPage = new CreatePostPage(page);
        editPostPage = new EditPostPage(page);

        await loginPage.open();
        await expect(page).toHaveTitle(loginPage.title);
        await loginPage.login(userName, password);
        await expect(page).toHaveTitle(allPostsPage.title);
        expect(page.url()).toContain('edit');
    })

    test('Create a new post', async ({ page }) => {
        let count1: number = 0;
        await allPostsPage.count().then(data => { count1 = data; });
        await expect(count1).toBeGreaterThan(1);

        await allPostsPage.clickAddPostLink();
        await expect(page).toHaveTitle(createPostPage.title);
        expect(page.url()).toContain('post-new');

        await createPostPage.add('New Blog Title', 'Content for title named New Blog Title');
        await allPostsPage.open();
        await allPostsPage.refresh();

        let count2: number = 0;
        await allPostsPage.count().then(data => { count2 = data; });
        await expect(count2).toBeGreaterThan(count1);
    });

    test('Edit a post', async ({ page }) => {
        let count1: number = 0;
        await allPostsPage.count().then(data => { count1 = data; });
        await expect(count1).toBeGreaterThan(1);

        await allPostsPage.clickEditPostLink();
        await expect(await page.title()).toContain(editPostPage.title);
        expect(page.url()).toContain('action=edit');

        await editPostPage.edit('Updated Blog Title', 'Content for title named Updated Blog Title');
        await allPostsPage.open();

        let count2: number = 0;
        await allPostsPage.count().then(data => { count2 = data; });
        await expect(count2).toBe(count1);
    });

    test('Delete a post', async ({ page }) => {
        let count1: number = 0;
        await allPostsPage.count().then(data => { count1 = data; });
        await expect(count1).toBeGreaterThan(1);

        await allPostsPage.clickDeletePostLink();

        let count2: number = 0;
        await allPostsPage.count().then(data => { count2 = data; });
        await expect(count2).toBeLessThan(count1);
        await expect(page).toHaveTitle(allPostsPage.title);
        expect(page.url()).toContain('edit');
    });
})