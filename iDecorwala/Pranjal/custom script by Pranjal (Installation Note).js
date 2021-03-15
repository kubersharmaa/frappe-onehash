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
        frm.add_custom_button(__('Warranty Claim'), function () {
            console.log("ins date", cur_frm.doc.inst_date);
            /* var item=frm.doc.items;
             let items=[];
             item.forEach(function(item,index){
                 items.push({
                     'item_code':item.item_code,
                     'item_name': item.item_name,
                     'qty': item.qty,
                     'description':item.description,
                     'lot_no':item.lot_no
                 })
             });
             frappe.db.insert({
                 'doctype':'Warranty Claim',
                 'customer':cur_frm.doc.customer,
                 'installation_note':cur_frm.doc.name,
                 'sales_order_number':cur_frm.doc.sales_order_number,
                 'item':items
             });*/
            frappe.route_options = {
                customer: cur_frm.doc.customer,
                installation_note: cur_frm.doc.name,
            };
            frappe.new_doc("Warranty Claim");
        }, __("Create"));
        /*frappe.call({
                "method": "frappe.client.set_value",
                "args": {
                    "doctype": "Warranty Claim",
                    "name": cur_frm.doc.name,
                    "fieldname": "installation_date",
                    "value": cur_frm.doc.inst_date
                }
            });*/
        //frappe.db.set_value("Warranty Claim","","installation_date","2021-01-01");
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

}
);


       //frappe.ui.form.on('Warranty Claim Item', {
/*frappe.ui.form.on("Warranty Claim", "refresh", function(frm) {
frappe.model.with_doc("Installation Note Item", frm.doc.getitems, function() {
var tabletransfer= frappe.model.get_doc("Installation Note", frm.doc.getitems)
$.each(qmtable.items, function(index, row){
d = frm.add_child("items");
d.field1 = row.item_code;
d.field2 = row.item_name;
cur_frm.refresh_field("items");
})
});
});
           /* item_code: function(frm, cdt, cdn) {
            frappe.call({
            method: "frappe.client.get",
            args: {
                name: item_code,
                doctype: "Warranty Claim Item"
            },
            callback(r) {
                if (r.message) {
                    for (var row in r.message.items) {

                        var child = frm.add_child("item_code");

                        frappe.model.set_value(child.doctype, child.name, "item_code", r.message.items[row].item_code);
                        frappe.model.set_value(child.doctype, child.name, "item_name", r.message.items[row].item_name);
                        frappe.model.set_value(child.doctype, child.name, "description", r.message.items[row].description);
                        frappe.model.set_value(child.doctype, child.name, "quantity", r.message.items[row].qty);
                        frappe.model.set_value(child.doctype, child.name, "lot_no", r.message.items[row].lot_no);
                        refresh_field("item_code");
                    }

                }
            }

        });

    }*/

//});*/
/*frappe.ui.form.on("Installation Note Item", {
    item_code: function(frm,cdt,cdn) {
        var row = locals[cdt][cdn];
        if (frm.doc.issue_date) {
            row.issue_date = frm.doc.issue_date;
            refresh_field("issue_date", cdn, "items");
        } else {
            frm.script_manager.copy_from_first_row("items", row, ["issue_date"]);
        }
    },
    issue_date: function(frm, cdt, cdn) {
        if(!frm.doc.issue_date) {
            erpnext.utils.copy_value_in_all_rows(frm.doc, cdt, cdn, "items", "issue_date");
        }
    }
});*/
/*frappe.ui.form.on('Installation Note Item','item_code',function(frm, cdt, cdn) {
var child = locals[cdt][cdn];
frappe.route_options = {“item_code”: frm.doc.name, “warranty_claim”: child.item_code };
frappe.set_route(“List”,“Warranty Claim Item”);
});*/
