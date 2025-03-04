import { Page, expect } from "@playwright/test"
import * as locator from "../utils/locator.json"
import { BasePage } from "../base/basepage"


export class UsersPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    // Login in with the system as superadmin
    async Login(email: string, password: string) {
        await this.type(locator.LoginPage.email, email)
        await this.type(locator.LoginPage.password, password)
        await this.click(locator.LoginPage.Login_btn)
    }

    // 1. asserting Welcome message after successfull login
    async Dashboard_Msg_Validation() {
        // await expect(this.page.locator(locator.Dashboard.success_msg)).toContainText('Welcome')
        await expect(this.page).toHaveTitle(/Dashboard/)
    }


    // 2. assertion on user to navigate to users page
    async Navigate_to_user_page() {
        await this.click(locator.Users.users_locator)
        await expect(this.page.locator(locator.Users.user_title)).toContainText('Users')
    }

    async navigate_to_user_listing_page() {
        await this.click(locator.Create.back_to_user_btn)
    }

    // 3. Creating new user
    async Create_New_User(first_name: string,
        middle_name: string,
        last_name: string,
        email: string,
        roles: string,
        supervisor: string) {
        await this.click(locator.Users.users_locator)
        await this.click(locator.Create.add_new_user)
        await this.type(locator.Create.first_name, first_name)
        await this.type(locator.Create.middle_name, middle_name)
        await this.type(locator.Create.last_name, last_name)
        await this.type(locator.Create.email, email)
        await this.click(locator.Create.gender)

        // Handling the Roles dropdown
        await this.click(locator.Create.roles_dpdown)
        await this.type(locator.Create.role_textbar, roles)
        await this.page.keyboard.press('Enter')

        // Handling the Supervisor dropdown
        await this.click(locator.Create.supervisor_dpdown)
        await this.type(locator.Create.supervisor_dpdown, supervisor)
        await this.page.keyboard.press('Enter')

        await this.click(locator.Create.submit_btn)
        await this.click(locator.Create.confirmation_submit_btn)
    }

    // 3. assertion on the user create successful message
    async validate_User_Creation_Success() {
        const successMessage = this.page.locator(locator.Success_msg.create_sucess_msg);
        await successMessage.waitFor({ state: 'visible', timeout: 10000 });
        await expect(successMessage).toBeVisible();
        // console.log(await successMessage.innerText());
    }

    // OR

    // async User_create_successful() {
    //     const message = await this.page.locator(locator.Success_msg.create_sucess_msg).innerText();
    //     expect(message).toContain('Created Successfully');
    // }


    // 4. Creating user without passing any data
    async Creating_User_invalid_data(first_name: string,
        middle_name: string,
        last_name: string,
        email: string,
        _roles: string,
        _supervisor: string) {
        await this.click(locator.Users.users_locator)
        await this.click(locator.Create.add_new_user)
        await this.type(locator.Create.first_name, first_name)
        await this.type(locator.Create.middle_name, middle_name)
        await this.type(locator.Create.last_name, last_name)
        await this.type(locator.Create.email, email)
        await this.click(locator.Create.submit_btn)
    }

    // 4. assertion on creating user with invalid data
    async create_user_with_invalid_data() {
        await expect(this.page.locator(locator.Users_validation.firstname_validation_msg))
            .toContainText('First name can only contain letters and a single space between them')
        await expect(this.page.locator(locator.Users_validation.lastname_validation_msg))
            .toContainText('Last name can only contain letters and a single space between them')
        await expect(this.page.locator(locator.Users_validation.email_validation_msg))
            .toContainText('Please input your email address!')
        await expect(this.page.locator(locator.Users_validation.gender_validation_msg))
            .toContainText('Please select the gender')
        await expect(this.page.locator(locator.Users_validation.supervisor_validation_msg))
            .toContainText('Please select a supervisor')
    }


    // 5. assertion on creating user without passing any data
    async create_user_without_data() {
        await expect(this.page.locator(locator.Required_validation.firstname_required))
            .toContainText('Please input your first name')
        await expect(this.page.locator(locator.Required_validation.lastname_required))
            .toContainText('Please input your last name')
        await expect(this.page.locator(locator.Required_validation.email_required))
            .toContainText('Please input your email address')
        await expect(this.page.locator(locator.Required_validation.gender_required))
            .toContainText('Please select the gender')
        await expect(this.page.locator(locator.Required_validation.supervisor_required))
            .toContainText('Please select a supervisor')
    }


    // 6. assertion on already taken email address 
    async email_already_taken() {
        await expect(this.page.locator(locator.Email_Validation.email_already_taken_msg))
            .toContainText('The email has already been taken.')
    }


    //7. handling table
    async user_table_handling() {
        await this.click(locator.Users.users_locator)
        await this.click(locator.Table.first_row)
        await expect(this.page.locator(locator.User_info.user_info_title))
            .toContainText('User Information')
    }


    async validate_User_In_Table(first_name: string) {
        const rows = this.page.locator(locator.Table.table_row);
        await rows.first().waitFor({ state: 'visible', timeout: 5000 }); // Wait for the first row to be visible
        const rowCount = await rows.count();
        console.log(`Total rows in table: ${rowCount}`);

        let isUserFound = false;
        let secondRowData = "";

        // Build the expected full name dynamically
        const expectedName = [first_name.trim(), middle_name?.trim(), last_name.trim()]
            .filter((namePart) => !!namePart) // Remove null/undefined/empty parts
            .join(" ")
            .toLowerCase();

        console.log(`Expected full name: ${expectedName}`);

        // Define usernames as an array of strings
        const usernames: string[] = [];

        if (rowCount > 0) {
            // Extract usernames from the table
            for (let i = 0; i < rowCount; i++) {
                const row = rows.nth(i);
                const cells = row.locator(locator.Table.table_cell);
                const cellText = await cells.allTextContents();

                if (cellText.length > 0) {
                    const username = cellText[0].trim(); // Assuming the username is in the first column
                    usernames.push(username.toLowerCase());
                    console.log(`Row ${i + 1} username: ${username}`);

                    // Capture Row 2 data
                    if (i === 1) {
                        secondRowData = username; // Data from Row 2
                        console.log(`Row 2 data captured: ${secondRowData}`);
                    }
                } else {
                    console.log(`Row ${i + 1} has no visible data.`);
                }
            }

            // Check if the expected name exists in the table
            if (usernames.includes(expectedName)) {
                isUserFound = true;
                console.log(`User '${expectedName}' found in the table.`);
            } else {
                console.log(`User '${expectedName}' not found in the table.`);
            }
        } else {
            console.log("No rows found in the table.");
        }

        // Compare second row data with the expected full name
        console.log(`Comparing Row 2 data with expected full name.`);
        if (secondRowData.toLowerCase() === expectedName) {
            console.log("Row 2 data matches the expected name.");
        } else {
            console.log("Row 2 data does not match the expected name.");
        }

        console.log(`User found: ${isUserFound}`);

        // Final assertion to ensure the user was found
        expect(isUserFound).toBe(true); // Ensure the user exists in the table
        console.log(`Validation successful: User '${expectedName}' found and matches expected data.`);
    }

}

