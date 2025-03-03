
export const LoginPage_Locator = {
    email: "#email",
    password: "#password",
    Login_btn: "button[type='submit']"
}

export const Dashboard_Locator = {
    success_msg: "div[class='ant-message-notice-content']"
}

export const Users_pg_Locator = {
    user_title: "h3[class^='text-base']",
    users_locator: "//a[contains(text(), 'Users')]"
}

export const Create_Locator = {
    add_new_user: "(//button[@type='button'])[1]",
    first_name: "#first_name",
    middle_name: "#middle_name",
    last_name: "#last_name",
    email: "#email",
    gender: "(//span[@class='ant-radio ant-wave-target'])[1]",
    roles_dpdown: "(//div[@class='ant-form-item-control-input'])[7]",
    role_textbar: "#roles",
    supervisor_dpdown: "#supervisor_name",
    cancel_btn: "(//button[@type='button'])[1]",
    submit_btn: "(//button[@type='button'])[2]",
    confirmation_cancel_btn: "(//button[@type='button'])[3]",
    confirmation_submit_btn: "(//button[@type='button'])[4]",
    back_to_user_btn: "button[type='submit']"
}

export const Success_msg_Locator = {
    create_sucess_msg: "(//div[@class='ant-modal-content'])[2]"
}

export const Email_Validation_Locator = {
    email_already_taken_msg: "div[class='ant-form-item-explain-error']"
}

export const Required_validation_Locator = {
    firstname_required: "(//div[@class='ant-form-item-explain-error'])[1]",
    lastname_required: "(//div[@class='ant-form-item-explain-error'])[2]",
    email_required: "(//div[@class='ant-form-item-explain-error'])[3]",
    gender_required: "(//div[@class='ant-form-item-explain-error'])[4]",
    supervisor_required: "(//div[@class='ant-form-item-explain-error'])[5]"
}

export const Users_validation_Locator = {
    firstname_validation_msg: "(//div[@class='ant-form-item-explain-error'])[1]",
    lastname_validation_msg: "(//div[@class='ant-form-item-explain-error'])[2]",
    email_validation_msg: "(//div[@class='ant-form-item-explain-error'])[3]",
    gender_validation_msg: "(//div[@class='ant-form-item-explain-error'])[4]",
    supervisor_validation_msg: "(//div[@class='ant-form-item-explain-error'])[5]"
}

export const Table_Locator = {
    user_table: "table[style*='table-layout:'] tr",
    first_row: "tr[class*='ant-table-row']:nth-of-type(1)",
    table_row: "//table[@style='table-layout: auto;']//tr",
    table_cell: "div[data-cell='Name']"
}

export const User_info_Locator = {
    user_info_title: "h2[class*='rounded-tl-3xl']"
}

export const edit_user_Locator = {
    edit_btn: "(//button[@title='Edit'])[1]",
    edit_form: "form[class*='ant-form']",
    first_name_edit: "#first_name",
    email_edit: "#email"
}

export const display_details_Locator = {
    details_first_row: "tr[class*='ant-table-row']:nth-child(1)",
    fist_name_detail: "p[title='Raam']",
    middle_name_detail: "(//div[@class='flex gap-1 col-span-2'])[2]",
    last_name_detail: "(//div[@class='flex gap-1 col-span-2'])[3]",
    gender_detail: "(//div[@class='flex gap-1 col-span-2'])[4]",
    email_detail: "(//div[@class='flex gap-1 col-span-2'])[5]",
    status_detail: "(//div[@class='flex gap-1 col-span-2'])[6]",
    role_detail: "(//div[@class='flex gap-1 col-span-2'])[7]",
    supervisor_detail: "(//div[@class='flex gap-1 col-span-2'])[8]"
}

export const grievance_page_nav = {
    grievance_nav: "//a[contains(text(), 'Grievance')]",
    grievance_title_validation: "//h3[text()='Grievances']"
}

export const create_grievance = {
    add_grievance_btn : "(//button[@type='button'])[1]",
    grievance_add_page_validation: "//h3[text()='Add Grievance']",
    fullname: "#full_name",
    gender_btn: "#gender",
    gender_male: "//div[@title='Male']",
    contact_num: "input[id='contact']",
    email: "input[id='email']",
    province_btn: "input[id='province_code']",
    province_koshi: "//div[@title='Bagmati Pradesh']",
    district_btn: "//span[@title='District']",
    district_kathmandu: "//div[@title='Kathmandu']",
    municaipality_btn: "//span[@title='Municipality']",
    municipality_kirtipur: "//div[@title='Kirtipur Municipality']",
    ward_btn: "//label[normalize-space(text())='Ward No']/following::div[contains(@class,'ant-select-selector')][1]",
    ward_six: "//div[@title='6']",
    address_btn: "[id='address']",
    grievance_title: "[id=title]",
    grievance_date_picker: "[id=received_date]",
    grievance_selected_date: "td[title='2025-03-01']",
    grievance_future_date: "td[title='2025-03-20']",
    report_grievance_field: "[id='report_method']",
    report_type_letter: "//div[@title='Letter']",
    grievance_type_btn: "[id='type']",
    grievance_type_social: "//div[@title='Social']",
    file_upload: "input[id='documents']",
    description: "[id='description']",
    submit_btn: "[class='ant-btn css-11210is ant-btn-primary ant-btn-lg form-btn primary-btn']",
    submit_confirmation_popup_box: "[class='ant-modal-header']",
    confirm_btn: "[class='ant-btn css-11210is ant-btn-primary primary-btn']",
    back_to_grievance_btn: "[class='ant-btn css-11210is ant-btn-default form-success-modal-btn border border-primary-green !m-0 !mt-8']",
    new_grievance_created_validation: "//tr[.//div[@data-cell='S.N.' and .//span[normalize-space()='1']]]//div[@data-cell='Title']/span",
    grievance_title_required_message: "[id='title_help']",
    girevance_date_required_message: "[id='received_date_help']",
    grievance_date_toast_message_validation: "[class='ant-message-notice ant-message-notice-error']",
    girveance_file_upload_validation: "[id='documents_help']",
    alter_submit_btn: "//div/button[@class='ant-btn css-11210is ant-btn-primary ant-btn-lg form-btn primary-btn']",
    complainant_name_validation: "//tr[.//div[@data-cell='S.N.' and .//span[normalize-space()='1']]]//div[@data-cell='Complainant Name']/span",
    
    


}

export const grievance_listing_page = {
    delete_grievance_btn: "//tr[.//div[@data-cell='S.N.']/span[normalize-space()='1']]//button[@title='Delete']",
    edit_girevance_btn: "//tr[.//div[@data-cell='S.N.']/span[normalize-space()='1']]//button[@title='Edit']",
    confirm_btn: "[class='ant-btn css-11210is ant-btn-primary primary-btn']",
    grievance_deleted_success_toast_message: "[class='ant-message-notice ant-message-notice-success']",
    first_data: "//tr[.//div[@data-cell='S.N.' and .//span[normalize-space()='1']]]",
    note_click_btn: "button[title='Open Notes']",
    add_note_btn: "[class='bg-[#e8faf0] py-4 px-10 mx-6 text-primary-green text-lg font-bold hover:bg-[#dcf5e7]']",
    note_add_description_box: "[class='ant-input css-11210is ant-input-outlined my-4']",
    note_submit_btn: "//button/span[text()='Submit']",
    toast_message_validation: "[class='ant-message-notice-content']"


}

