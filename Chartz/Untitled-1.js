frappe.query_reports["Sales Dashboard"] = {
    'filters':[
        {
            'fieldname': 'name',
            'label':__("Name"),
            'fieldtype': 'Link',
            'options': "Name",
            "default": frappe.defaults.get_user_default("name")
        },
    ]
}