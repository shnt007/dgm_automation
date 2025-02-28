import { Page, expect } from "@playwright/test";
import {
    Create_Locator,
    Users_pg_Locator,
    Success_msg_Locator,
    Email_Validation_Locator,
    Required_validation_Locator,
    Users_validation_Locator,
    Table_Locator,
    User_info_Locator, display_details_Locator,
    edit_user_Locator
} from "../utils/locator"

// 2. assertion on user to navigate to users page
export async function Navigate_to_userpage(page: Page) {
    await page.click(Users_pg_Locator.users_locator)


    await expect(page).toHaveTitle(/Users/)
    // await expect(page.locator(Users_Locator.user_title)).toContainText('Users')
}

export async function navigate_to_user_listing_page(page: Page) {
    await page.click(Create_Locator.back_to_user_btn, { timeout: 15000 })
}

// // 3. Creating new user
export async function Create_New_User(
    page: Page,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    roles: string,
    supervisor: string) {
    await page.click(Users_pg_Locator.users_locator)
    await page.click(Create_Locator.add_new_user)
    await page.fill(Create_Locator.first_name, first_name)
    await page.fill(Create_Locator.middle_name, middle_name)
    await page.fill(Create_Locator.last_name, last_name)
    await page.fill(Create_Locator.email, email)
    await page.click(Create_Locator.gender)

    // Handling the Roles dropdown
    await page.click(Create_Locator.roles_dpdown)
    await page.fill(Create_Locator.role_textbar, roles)
    await page.keyboard.press('Enter')

    // Handling the Supervisor dropdown
    await page.fill(Create_Locator.supervisor_dpdown, supervisor)
    await page.keyboard.press('Enter')

    await page.click(Create_Locator.submit_btn)
    await page.click(Create_Locator.confirmation_submit_btn)
}

// // 3. assertion on the user create successful message
export async function asertion_User_Creation_Success(page: Page) {
    const successMessage = page.locator(Success_msg_Locator.create_sucess_msg);
    await successMessage.waitFor({ state: 'visible', timeout: 15000 });
    await expect(successMessage).toBeVisible();
    // console.log(await successMessage.innerText());
}

// // 4. Creating user without passing any data
export async function Creating_User_with_invalid_data(
    page: Page,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    _roles: string,
    _supervisor: string) {
    await page.click(Users_pg_Locator.users_locator)
    await page.click(Create_Locator.add_new_user)
    await page.fill(Create_Locator.first_name, first_name)
    await page.fill(Create_Locator.middle_name, middle_name)
    await page.fill(Create_Locator.last_name, last_name)
    await page.fill(Create_Locator.email, email)
    await page.click(Create_Locator.submit_btn)
}

// // 4. assertion on creating user with invalid data
export async function assertion_user_with_invalid_data(page: Page) {
    await expect(page.locator(Users_validation_Locator.firstname_validation_msg))
        .toContainText('First name can only contain letters and a single space between them')
    await expect(page.locator(Users_validation_Locator.lastname_validation_msg))
        .toContainText('Last name can only contain letters and a single space between them')
    await expect(page.locator(Users_validation_Locator.email_validation_msg))
        .toContainText('Please input your email address!')
    await expect(page.locator(Users_validation_Locator.gender_validation_msg))
        .toContainText('Please select the gender')
    await expect(page.locator(Users_validation_Locator.supervisor_validation_msg))
        .toContainText('Please select at least one role')
}


// // 5. assertion on creating user without passing any data
export async function assertion_user_without_data(page: Page) {
    await expect(page.locator(Required_validation_Locator.firstname_required))
        .toContainText('Please input your first name')
    await expect(page.locator(Required_validation_Locator.lastname_required))
        .toContainText('Please input your last name')
    await expect(page.locator(Required_validation_Locator.email_required))
        .toContainText('Please input your email address')
    await expect(page.locator(Required_validation_Locator.gender_required))
        .toContainText('Please select the gender')
    await expect(page.locator(Required_validation_Locator.supervisor_required))
        .toContainText('Please select at least one role')
}


// // 6. assertion on already taken email address
export async function assertion_email_already_taken(page: Page) {
    await expect(page.locator(Email_Validation_Locator.email_already_taken_msg))
        .toContainText('The email has already been taken.')
}


export async function asserting_user_without_data(page: Page) {
    await expect(page.locator(Users_validation_Locator.firstname_validation_msg))
        .toContainText('First name can only contain letters and a single space between them')
}

//7. handling table
export async function user_table_handling(page: Page) {
    await page.click(Users_pg_Locator.users_locator)
    await page.click(Table_Locator.first_row)
    await expect(page.locator(User_info_Locator.user_info_title))
        .toContainText('User Information')
}

//8. validaing the name with the newly created user
export async function validate_User_In_Table(page: Page, first_name: string) {
    const rows = page.locator(Table_Locator.table_row);
    await rows.first().waitFor({ state: 'visible', timeout: 5000 });
    const rowCount = await rows.count();
    //console.log(`Total rows in table: ${rowCount}`)

    // await this.page.pause()

    let isUserFound = false;
    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const cells = row.locator(Table_Locator.table_cell);
        const cellText = await cells.allTextContents();
        //console.log(`Row ${i}: ${cellText}`)

        if (cellText.includes(first_name)) {
            //  console.log(`Print name: ${first_name}`)
            isUserFound = true;
            //console.log(`User found = ${isUserFound}`)
            break;
        }
    }
    expect(isUserFound).toBeTruthy()
    //console.log(`Validation successful: User ${first_name} found.`);
}

// 9. Validating edit form with previous data
export async function validating_edit_user(page: Page) {
    await page.click(Users_pg_Locator.users_locator)
    await page.click(edit_user_Locator.edit_btn)
    await expect(page).toHaveTitle(/Edit User/)
    await page.waitForSelector(edit_user_Locator.edit_form)

    // Validate the name and email fields contain the expected data
    // await expect(page.locator(edit_user_Locator.first_name_edit)).toHaveValue('User');
    // await expect(page.locator(edit_user_Locator.email_edit)).toHaveValue('subash.gole@test.com');
}

// 9. Validating the detailed page
export async function validating_display_detail(page: Page, email: string) {
    await page.click(Users_pg_Locator.users_locator)
    await page.click(display_details_Locator.details_first_row)
    await expect(page).toHaveTitle(/User Profile/)

    //validating the previous data
    // await expect(locator.edit_user.first_name_edit).toBe(first_name)
    const firstRowEmail = await page.locator(display_details_Locator.email_detail).textContent()
    expect(firstRowEmail?.trim()).toBe(":" + email)


}


