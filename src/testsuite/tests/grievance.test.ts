import { UsersPage } from "../../page/users.page"
import { test } from "@playwright/test"
import * as data from "../data/credentials.json"
import * as creategrievance from "../../page/grievance.page"
import { valid_grievance_data } from "../data/data"


test.describe('Login',() => {
    let userpage: UsersPage
    test.beforeEach(async ({ page }) => {
        userpage = new UsersPage(page)
        await userpage.navigateTo('login')
        await userpage.Login(data.LoginCredentails.superAdmin, data.LoginCredentails.password)

    })

    //Validating user Sign in success message validation
    test.only("1. Validating Login Successfully", async () => {
        await userpage.Dashboard_Msg_Validation()
    })

    //Validating user's to navigation to user page
    test("2. Validating Navigation to Grievance Page ", async ({ }) => {
        await userpage.Navigate_to_user_page()
    })

     test("3. Validating Successful Creating New User with valid data", async ({ page }) => {
            await creategrievance.create_new_grievance(page,
                valid_grievance_data.full_name,
                valid_grievance_data.gender,
                valid_grievance_data.contact_num,
                valid_grievance_data.email,
                valid_grievance_data.province,
                valid_grievance_data.district, 
                valid_grievance_data.municipality,
                valid_grievance_data.ward_no,   
                valid_grievance_data.address,         
                valid_grievance_data.title,
                valid_grievance_data.date,
                valid_grievance_data.report, 
                valid_grievance_data.type,
                valid_grievance_data.fileUploadPath,
                valid_grievance_data.description   

                )
        })

        test("4. Grievance creation with required fields only", async ({ page }) => {
            await creategrievance.create_new_grievance_with_required_field(page,       
                valid_grievance_data.title,
                valid_grievance_data.date,

                )    
        })

        
        

 })