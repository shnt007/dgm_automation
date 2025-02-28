import { Locator, Page } from "@playwright/test"
import * as locator from "../utils/locator.json"

export class BasePage {
    constructor(protected readonly page: Page) { }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url)
    }

    async click(locator: string): Promise<void> {
        await this.page.click(locator)
    }

    async locator(locator: string): Promise<void> {
        await this.page.locator(locator)
    }

    async type(locator: string, text: string): Promise<void> {
        await this.page.fill(locator, text)
    }




    // async searchInTable(value: string): Promise<number | null> {
    //     const rows = this.table.locator(locator.Users.user_table); // Adjust for table rows
    //     const rowCount = await rows.count();

    //     for (let i = 0; i < rowCount; i++) {
    //         const row = rows.nth(i);
    //         const rowText = await row.textContent();

    //         if (rowText && rowText.includes(value)) {
    //             console.log(`Found value "${value}" in row ${i + 1}`);
    //             return i + 1; // Return 1-based index
    //         }
    //     }

    //     console.log(`Value "${value}" not found in the table.`);
    //     return null;
    // }


    // async clickTableElement(tableSelector: string, elementName: string): Promise<void> {
    //     try {
    //         const dynamicElementSelector = `${tableSelector} tr:has(td:text("${elementName}")) button, ${tableSelector} tr:has(td:text("${elementName}")) a`;
    //         const dynamicElement = await this.page.waitForSelector(dynamicElementSelector, { state: 'visible' });
    //         if (dynamicElement) {
    //             await dynamicElement.click();
    //             console.log(`Clicked on element '${elementName}' in the table.`);
    //         } else {
    //             console.log(`Element '${elementName}' is not displayed.`);
    //         }
    //     }
    //     catch (error) {
    //         console.error(`Element '${elementName}' not found in the table.`);
    //         throw new Error(`Element '${elementName}' not found.`);
    //     }
    // }


}

