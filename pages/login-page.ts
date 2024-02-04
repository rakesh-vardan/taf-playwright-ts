import { Locator, Page } from "@playwright/test";

export class LoginPage {
    
    public readonly title: string = 'Log In — WordPress.com';

    private readonly userNameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly continueButton: Locator;
    private readonly loginButton: Locator;
    
    constructor(public readonly page: Page) {
        this.userNameTextBox = this.page.getByLabel('Email Address or Username');
        this.passwordTextBox = this.page.getByLabel('Password');
        this.continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
        this.loginButton = this.page.getByRole('button', { name: 'Log In', exact: true });
    }

    async open() {
        await this.page.goto('/wp-admin/edit.php');
    }

    async login(email: string, password: string) {
        await this.userNameTextBox.fill(email);
        await this.continueButton.click();
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}