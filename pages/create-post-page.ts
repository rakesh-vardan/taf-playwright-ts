import { Locator, Page } from "@playwright/test";

export class CreatePostPage {

    public readonly title: string = 'Add New Post ‹ Selenium POM Practice Site — WordPress';

    private readonly blogTitleText: Locator;
    private readonly blogContentText1: Locator;
    private readonly blogContentText2: Locator;
    private readonly publishButton: Locator;
    private readonly finalPublishButton: Locator;

    constructor(public readonly page: Page) {
        this.blogTitleText = page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add a post title');
        this.blogContentText1 = page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Add default block');
        this.blogContentText2 = page.frameLocator('iframe[name="editor-canvas"]').getByLabel('Empty block; start writing or');
        this.publishButton = page.getByRole('button', { name: 'Publish', exact: true });
        this.finalPublishButton = page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true });
    }

    async add(title: string, content: string) {
        await this.blogTitleText.fill(title);
        await this.blogContentText1.click();
        await this.blogContentText2.fill(content);
        await this.publishButton.click();
        await this.finalPublishButton.click();
    }

}