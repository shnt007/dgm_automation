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
    //     // console.log(message);
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

    //8. validaing the name with the newly created user
    async validate_User_In_Table(first_name: string) {
        const rows = this.page.locator(locator.Table.table_row);
        await rows.first().waitFor({ state: 'visible', timeout: 5000 });
        const rowCount = await rows.count();
        console.log(`Total rows in table: ${rowCount}`)

        // await this.page.pause()

        let isUserFound = false;
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);
            const cells = row.locator(locator.Table.table_cell);
            const cellText = await cells.allTextContents();
            console.log(`Row ${i}: ${cellText}`)

            if (cellText.includes(first_name)) {
                console.log(`Print name: ${first_name}`)
                isUserFound = true;
                console.log(`User found = ${isUserFound}`)
                break;
            }
        }


        expect(isUserFound).toBeTruthy()
        console.log(`Validation successful: User ${first_name} found.`);
    }

    // 9. Validating edit form with previous data
    async validating_edit_user() {
        await this.click(locator.Users.users_locator)
        await this.page.click(locator.edit_user.edit_btn)
        await expect(this.page).toHaveTitle(/Edit User/)
        await this.page.waitForSelector(locator.edit_user.edit_form)

        // Validate the name and email fields contain the expected data
        await expect(this.page.locator(locator.edit_user.first_name_edit)).toHaveValue('User');
        await expect(this.page.locator(locator.edit_user.email_edit)).toHaveValue('subash.gole@test.com');
    }

    // 10. Validating the detailed page
    async validating_display_detail(email: string) {
        await this.click(locator.Users.users_locator)
        await this.page.click(locator.display_details.details_first_row)
        await expect(this.page).toHaveTitle(/User Profile/)

        //validating the previous data
        // await expect(locator.edit_user.first_name_edit).toBe(first_name)
        const firstRowEmail = await this.page.locator(locator.display_details.email_detail).textContent()
        expect(firstRowEmail?.trim()).toBe(email)
        console.log(`Validated that the email "${email}" is correctly displayed in the first row.`)



    }

}



