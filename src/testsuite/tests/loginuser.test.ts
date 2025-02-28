import { test } from "@playwright/test"
import * as userpage from "../../page/login.page"
import * as createpage from "../../page/createuser.page"
import { invalid_Cred_data, without_Cred_data, used_Email_cred_data, valid_Cred_data } from "../data/data";

test.describe("Login Validation", async () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await userpage.loginto(page, baseURL);

    })
    test("1. Validating Login", async ({ page }) => {
        await userpage.Dashboard_Msg(page);
    })

    //Validating user's to navigation to user page
    test("2. Validating Navigation to User Page ", async ({ page }) => {
        await createpage.Navigate_to_userpage(page)
    })
    // validating successful message after creating new user
    test("3. Validating Successful Creating New User with valid data", async ({ page }) => {
        await createpage.Create_New_User(page,
            valid_Cred_data.first_name,
            valid_Cred_data.middle_name,
            valid_Cred_data.last_name,
            valid_Cred_data.email,
            valid_Cred_data.roles,
            valid_Cred_data.supervisor)
        await createpage.asertion_User_Creation_Success(page)
        await createpage.navigate_to_user_listing_page(page)
        await createpage.validate_User_In_Table(page, valid_Cred_data.first_name)
    })

    test("4. Validating create user with invalid data", async ({ page }) => {
        await createpage.Creating_User_with_invalid_data(page,
            invalid_Cred_data.first_name,
            invalid_Cred_data.middle_name,
            invalid_Cred_data.last_name,
            invalid_Cred_data.email,
            invalid_Cred_data.roles,
            invalid_Cred_data.supervisor)
        await createpage.assertion_user_with_invalid_data(page)
    })

    //     // creating user without any input data
    test("5. Validating Create User without data", async ({ page }) => {
        await createpage.Creating_User_with_invalid_data(
            page,
            without_Cred_data.first_name,
            without_Cred_data.middle_name,
            without_Cred_data.last_name,
            without_Cred_data.email,
            without_Cred_data.roles,
            without_Cred_data.supervisor)
        await createpage.assertion_user_without_data(page)
    })

    //     // Email validation as email address already taken
    test("6. Validating Email Address Already Taken", async ({ page }) => {
        await createpage.Create_New_User(
            page,
            used_Email_cred_data.first_name,
            used_Email_cred_data.middle_name,
            used_Email_cred_data.last_name,
            used_Email_cred_data.email,
            used_Email_cred_data.roles,
            used_Email_cred_data.supervisor)

        await createpage.assertion_email_already_taken(page)
    })

    // Table handling
    test("7. Handling the table", async ({ page }) => {
        await createpage.user_table_handling(page)
    })

    test("8. Editing the listed user", async ({ page }) => {
        await createpage.validating_edit_user(page)
    })

    test("9. Validating the details of new created user", async ({ page }) => {
        await createpage.validating_display_detail(page, valid_Cred_data.email)
    })
})