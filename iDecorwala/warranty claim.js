frappe.ui.form.on('Warranty Claim', {
    refresh(frm) {

        if (cur_frm.doc.installation_note === undefined) {
            frm.set_df_property('fetch_items', 'hidden', true);
        }

        let warranty_expiry_date;
        warranty_expiry_date = frappe.datetime.add_days(frm.doc.installation_date, 365);

        frm.set_value("warranty_expiry_date", warranty_expiry_date);
        if (frappe.datetime.nowdate() < warranty_expiry_date) {
            frm.set_value("warranty_amc_status", "Under Warranty");
        }
        else {
            frm.set_value("warranty_amc_status", "Out of Warranty");
        }
    },
    "fetch_items": function (frm) {
        if (cur_frm.doc.installation_note) {
            frappe.db.get_doc('Installation Note', cur_frm.doc.installation_note)
                .then(doc => {

                    cur_frm.clear_table("items");
                    doc.items.forEach(item => {
                        frm.add_child('items', {
                            item_code: item.item_code,
                            lot_no: item.lot_no,
                            serial_no: item.serial_no,
                            qty: item.qty,
                            description: item.description
                        });
                        frm.refresh_field('items');
                    });
                });
        }
    }
});