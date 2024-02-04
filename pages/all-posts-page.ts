import { Locator, Page } from "@playwright/test";

export class AllPostsPage {
    
    public readonly title: string = 'Posts ‹ Selenium POM Practice Site — WordPress';

    private readonly addNewPostLink: Locator;
    private readonly editPostLink: Locator;
    private readonly deletePostLink: Locator;
    private readonly postsCount: Locator;
    private readonly checkBox: Locator;

    constructor(public readonly page: Page) {
        this.addNewPostLink = this.page.locator('#split-page-title-action').getByRole('link', { name: 'Add New Post' });
        this.editPostLink = this.page.locator('css=span[class=\'edit\']').first();
        this.deletePostLink = this.page.locator('css=span[class=\'trash\']').first();
        this.postsCount = this.page.locator('css=li[class=\'all\'] a span');
        this.checkBox = this.page.locator('xpath=//tbody[@id=\'the-list\']/tr[1]/th/input');
    }

    async open() {
        await this.page.goto('/wp-admin/edit.php')
    }

    async clickAddPostLink() {
        await this.addNewPostLink.click();
    }

    async clickEditPostLink() {
        await this.checkBox.hover();
        await this.editPostLink.first().click();
    }

    async clickDeletePostLink() {
        await this.checkBox.hover();
        await this.deletePostLink.click();
    }

    async refresh() {
        await this.page.reload();
    }

    async count(): Promise<number> {
        const text = await this.postsCount.textContent() as string;
        return +text.replace('(', '').replace(')', '');
    }
}