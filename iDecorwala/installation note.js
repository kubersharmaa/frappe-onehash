frappe.ui.form.on('Installation Note', {
    setup: function (frm) {
        cur_frm.set_query("installer_type", function () {
            return {
                filters: [
                    { "name": ["in", ["Supplier", "Employee"]] }
                ]
            };
        });
    },
    installer_type: function (frm) {
        if (frm.doc.installer_type == "Supplier") {
            frm.set_query("installer_code", function () {
                return {
                    filters: [
                        ["Supplier", "supplier_group", "in", ["Installation"]]
                    ],
                    "installer_type": function (frm) {
                        cur_frm.add_fetch("installer_code", "supplier_name", "installer_name");
                    }
                };
            });
        }
        else {
            frm.set_query("installer_code", function () {
                return {
                    "installer_type": function (frm) {
                        cur_frm.add_fetch("installer_code", "employee_name", "installer_name");
                    },
                    filters: [
                        ["Employee", "designation", "in", ["Labourers"]]
                    ]
                };
            });
        }
    },
    refresh: function (frm) {

        // console.log(cur_frm.doc.items);

        frm.add_custom_button(__('Warranty Claim'), function () {
            //console.log("ins date", cur_frm.doc.inst_date);

            frappe.route_options = {
                customer: cur_frm.doc.customer,
                installation_note: cur_frm.doc.name,
            };
            frappe.new_doc("Warranty Claim");
        }, __("Create"));

        frm.add_custom_button(__('Service Visit'), function () {
            frappe.route_options = {
                "customer": cur_frm.doc.customer
            };
            frappe.new_doc("Maintenance Visit");
        }, __("Create"));
    },
    "installation_address_name": function (frm) {
        frappe.call({
            method: 'frappe.contacts.doctype.address.address.get_address_display',
            args:
            {
                'doctype': 'Address',
                'address_dict': frm.doc.installation_address_name
            },
            callback: function (response) {
                cur_frm.set_value("installation_address", response.message);
            }
        });
    }
});