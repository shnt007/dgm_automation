import { Page, expect } from "@playwright/test"
import { logindata } from "../testsuite/data/data"
import * as locator from "../utils/locator.json"

export async function loginto(page: Page, baseURL: string | undefined): Promise<void> {
    await page.goto('/login');
    await page.fill(locator.LoginPage.email, logindata.superAdmin);
    await page.fill(locator.LoginPage.password, logindata.password);
    await page.click(locator.LoginPage.Login_btn);
}

export async function Dashboard_Msg(page: Page) {
    await expect(page).toHaveTitle(/Dashboard/);

}

