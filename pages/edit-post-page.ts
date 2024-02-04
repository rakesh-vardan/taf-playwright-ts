import { Locator, Page } from "@playwright/test";

export class EditPostPage {

    public readonly title: string = 'Edit Post';

    private readonly postTitle: Locator;
    private readonly postContent: Locator;
    private readonly updateButton: Locator;

    constructor(public readonly page: Page) {
        this.postTitle = this.page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title');
        this.postContent = this.page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Block: Paragraph');
        this.updateButton = this.page.getByRole('button', { name: 'Update' });
    }

    async edit(title: string, content: string) {
        await this.postTitle.click();
        await this.postTitle.fill(title);
        await this.postContent.click();
        await this.postContent.fill(content);
        await this.updateButton.first().click();
    }

}