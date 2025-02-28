
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
