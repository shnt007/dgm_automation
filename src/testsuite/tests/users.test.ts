import { UsersPage } from "../../page/users.page"
import { test } from "@playwright/test"
import * as data from "../data/credentials.json"

test.describe('Login', async () => {
    let userpage: UsersPage
    test.beforeEach(async ({ page, baseURL }) => {
        userpage = new UsersPage(page)
        await userpage.navigateTo(`${baseURL}/login`)
        await userpage.Login(data.LoginCredentails.superAdmin, data.LoginCredentails.password)

    })

    //Validating user Sign in success message validation
    test("1. Validating Login Successfully", async () => {
        await userpage.Dashboard_Msg_Validation()
    })

    //Validating user's to navigation to user page
    test("2. Validating Navigation to User Page ", async ({ }) => {
        await userpage.Navigate_to_user_page()
    })

    // validating successful message after creating new user
    test.only("3. Validating Successful Creating New User with valid data", async ({ }) => {
        await userpage.Create_New_User(data.User_valid_data.first_name,
            data.User_valid_data.middle_name,
            data.User_valid_data.last_name,
            data.User_valid_data.email,
            data.User_valid_data.roles,
            data.User_valid_data.supervisor)
        await userpage.validate_User_Creation_Success()
        await userpage.navigate_to_user_listing_page()
        await userpage.validate_User_In_Table(data.User_valid_data.first_name)
    })

    test("4. Validating create user with invalid data", async ({ }) => {
        await userpage.Creating_User_invalid_data(data.User_invalid_data.first_name,
            data.User_invalid_data.middle_name,
            data.User_invalid_data.last_name,
            data.User_invalid_data.email,
            data.User_invalid_data.roles,
            data.User_invalid_data.supervisor)
        await userpage.create_user_with_invalid_data()
    })

    // creating user without any input data
    test("5. Validating Create User without data", async ({ }) => {
        await userpage.Creating_User_invalid_data(data.User_without_data.first_name, data.User_without_data.middle_name, data.User_without_data.last_name, data.User_without_data.email, data.User_without_data.roles, data.User_without_data.supervisor)
        await userpage.create_user_without_data()
    })

    // Email validation as email address already taken
    test("6. Validating Email Address Already Taken", async ({ }) => {
        await userpage.Create_New_User(data.Used_email.first_name, data.Used_email.middle_name, data.Used_email.last_name, data.Used_email.email, data.Used_email.roles, data.Used_email.supervisor)
        await userpage.email_already_taken()
    })

    // Table handling
    test("7. Handling the table", async ({ }) => {
        await userpage.user_table_handling()
    })


})