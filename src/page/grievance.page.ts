import { Page, expect } from "@playwright/test";
import path from 'path';
import {
    grievance_page_nav,
    create_grievance,
    grievance_listing_page
} from "../utils/locator"

// 2. assertion on user to navigate to users page
export async function Navigate_to_userpage(page: Page) {
    await page.click(grievance_page_nav.grievance_nav)

    await expect(page).toHaveTitle(/grievance/)
}

export async function navigate_to_grievance_listing_page(page: Page) {
    await page.click(grievance_page_nav.grievance_nav, { timeout: 15000 })
    await expect(page.locator(grievance_page_nav.grievance_title_validation)).toHaveText('Grievances')
}

export async function create_new_grievance( page: Page,
    full_name: string,
    gender: string,
    contact_num: string,
    email: string,
    province: string,
    district: string,
    municipality: string,
    ward_no: string,
    address: string,
    grievance_title: string,
    grievance_received_date: string,
    method_used_to_report_grievance: string,
    grievance_type: string,
    fileUploadPath: string,
    description: string
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.fill(create_grievance.fullname,full_name)
    await page.click(create_grievance.gender_btn)
    await page.click(create_grievance.gender_male)
    await page.fill(create_grievance.contact_num,contact_num)
    await page.fill(create_grievance.email,email)
    await page.click(create_grievance.province_btn)
    await page.click(create_grievance.province_koshi)
    await page.click(create_grievance.district_btn)
    await page.click(create_grievance.district_kathmandu)
    await page.click(create_grievance.municaipality_btn)
    await page.click(create_grievance.municipality_kirtipur)
    await page.click(create_grievance.ward_btn)
    await page.click(create_grievance.ward_six)
    await page.fill(create_grievance.address_btn,address)
    await page.fill(create_grievance.grievance_title,grievance_title)
    await page.click(create_grievance.grievance_date_picker)
    await page.click(create_grievance.grievance_selected_date)
    await page.click(create_grievance.report_grievance_field)
    await page.click(create_grievance.report_type_letter)
    await page.click(create_grievance.grievance_type_btn)
    await page.click(create_grievance.grievance_type_social)
    // File upload step:
  // Resolve the absolute file path based on the provided relative path
    const absoluteFilePath = path.resolve(process.cwd(), fileUploadPath);
    await page.setInputFiles(create_grievance.file_upload, absoluteFilePath);
    await page.fill(create_grievance.description,description);
    await page.click(create_grievance.submit_btn)
    await expect(page.locator(create_grievance.submit_confirmation_popup_box)).toBeVisible()
    await page.click(create_grievance.confirm_btn);
    await page.click(create_grievance.back_to_grievance_btn);
    const displayedName = await page.locator(create_grievance.new_grievance_created_validation).innerText();
    await expect(displayedName.trim()).toBe('Automation-Test');
    console.log("Grievance created successfully");
}

export async function create_new_grievance_with_required_field( page: Page,
    grievance_title: string,
    grievance_received_date: string,
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.fill(create_grievance.grievance_title,grievance_title)
    await page.click(create_grievance.grievance_date_picker)
    await page.click(create_grievance.grievance_selected_date)
    await page.click(create_grievance.submit_btn)
    await page.click(create_grievance.confirm_btn);
    await page.click(create_grievance.back_to_grievance_btn);
    const displayedName = await page.locator(create_grievance.new_grievance_created_validation).innerText();
    await expect(displayedName.trim()).toBe('Automation-Test');
    console.log("Grievance created successfully");
}

export async function create_new_grievance_without_required_field( page: Page, 
    grievance_title: string

){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.click(create_grievance.submit_btn)
    await expect(page.locator(create_grievance.grievance_title_required_message)).toHaveText("Please enter the grievance title")
    await expect(page.locator(create_grievance.girevance_date_required_message)).toHaveText("Please select the grievance received date")
}

export async function create_new_grievance_without_girevance_date( page: Page, 
    grievance_title: string

){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.click(create_grievance.submit_btn)
    await expect(page.locator(create_grievance.girevance_date_required_message)).toHaveText("Please select the grievance received date")
}

export async function create_new_grievance_with_future_date( page: Page,
    grievance_title: string
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.fill(create_grievance.grievance_title,grievance_title)
    await page.click(create_grievance.grievance_date_picker)
    await page.click(create_grievance.grievance_future_date)
    await page.click(create_grievance.submit_btn)
    await page.click(create_grievance.confirm_btn)
    await expect(page.locator(create_grievance.girevance_date_required_message)).toHaveText("The received date field must be a date before or equal to today.")
    await expect(page.locator(create_grievance.grievance_date_toast_message_validation)).toBeVisible()

}

export async function create_new_grievance_with_large_file( page: Page,
    grievance_title: string,
    grievance_received_date: string,
    fileUploadPath: string,
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(create_grievance.add_grievance_btn)
    await page.fill(create_grievance.grievance_title,grievance_title)
    await page.click(create_grievance.grievance_date_picker)
    await page.click(create_grievance.grievance_selected_date)
    const absoluteFilePath = path.resolve(process.cwd(), fileUploadPath);
    await page.setInputFiles(create_grievance.file_upload, absoluteFilePath);
    await page.click(create_grievance.submit_btn)
    await expect(page.locator(create_grievance.girveance_file_upload_validation)).toHaveText("Uploaded file shouldn't be larger than 5MB.")

}

export async function delete_grievance( page: Page
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(grievance_listing_page.delete_grievance_btn)
    await page.click(grievance_listing_page.confirm_btn)
    await expect(page.locator(grievance_listing_page.grievance_deleted_success_toast_message)).toBeVisible()

}

export async function edit_grievance( page: Page,
    edited_fullname: string
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(grievance_listing_page.edit_girevance_btn)
    await page.fill(create_grievance.fullname,"")
    await page.fill(create_grievance.fullname,edited_fullname)
    await page.locator(create_grievance.alter_submit_btn).scrollIntoViewIfNeeded();
    await page.click(create_grievance.alter_submit_btn)
    await page.click(create_grievance.confirm_btn);
    await page.click(create_grievance.back_to_grievance_btn);
    const displayedName = await page.locator(create_grievance.complainant_name_validation).innerText();
    await expect(displayedName.trim()).toBe('Sujit');
    console.log("Grievance created successfully");
}

export async function add_note(page: Page,
    note_description: string
){
    await page.click(grievance_page_nav.grievance_nav)
    await page.click(grievance_listing_page.first_data)
    await page.click(grievance_listing_page.note_click_btn)
    await page.click(grievance_listing_page.add_note_btn)
    await page.fill(grievance_listing_page.note_add_description_box,note_description)
    await page.click(grievance_listing_page.note_submit_btn)
    await expect(page.locator(grievance_listing_page.toast_message_validation)).toBeVisible()

}
