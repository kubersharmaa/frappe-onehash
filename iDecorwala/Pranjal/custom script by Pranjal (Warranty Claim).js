frappe.ui.form.on('Warranty Claim', {
	refresh(frm) {
	    console.log(frm.doc.installation_note.installation_note_item);
	    var warranty_expiry_date;
	    warranty_expiry_date=frappe.datetime.add_days(frm.doc.installation_date, 365);
		frm.set_value("warranty_expiry_date",warranty_expiry_date );
		if(frappe.datetime.nowdate()<warranty_expiry_date){
		    frm.set_value("warranty_amc_status","Under Warranty");
		}
		else{
		    frm.set_value("warranty_amc_status","Out of Warranty");
		}
	}
})
/*frappe.ui.form.on("Warranty Claim Item", {
    "item_code": function(frm) {
        frappe.model.with_doc("Installation Note Item", frm.doc.installation_note, function() {
            var tabletransfer= frappe.model.get_doc("Installation Note Item", frm.doc.installation_note)
            $.each(tabletransfer.items, function(index, row){
                var d = frm.add_child("items");
                d.item_code = row.item_code;
                d.qty = row.qty;
                frm.refresh_field("items");
            });
        });
    }
});*/
/*frappe.ui.form.on("Warranty Claim Item", "installation_note", function(frm) {
    frappe.model.with_doc("Installation Note", frm.doc.onload, function() {
        var tabletransfer= frappe.model.get_doc("Installation Note", frm.doc.onload)
        $.each(tabletransfer.installation_note_items, function(index, row){
            d = frm.add_child("warranty_clam_items");
            d.item_code = row.item_code;
            d.lot_no = row.lot_no;
            d.qty = row.qty;
            frm.refresh_field("warranty_clam_items");
        });
    })
});*/
/*frappe.ui.form.on("Warranty Claim Item", {
   item_code: function(frm,cdt,cdn) {
        var row = locals[cdt][cdn];
        var child = frm.add_child("item_code");
                        frappe.model.set_value(child.doctype, child.name, "item_code", items[row].item_code);
                        frappe.model.set_value(child.doctype, child.name, "item_name", items[row].item_name);
                        frappe.model.set_value(child.doctype, child.name, "description", items[row].description);
                        frappe.model.set_value(child.doctype, child.name, "quantity", items[row].qty);
                        frappe.model.set_value(child.doctype, child.name, "lot_no", items[row].lot_no);
                        refresh_field("item_code");
   }
});*/