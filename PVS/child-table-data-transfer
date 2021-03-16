frappe.ui.form.on('Quotation', {
    refresh(frm){
        
    },
	'get_table': function(frm) {
		// Get Quotation Data
        if(cur_frm.doc.name){
            frappe.db.get_doc("Quotation", cur_frm.doc.name)
                    .then(doc =>{
                        
                        // Store Quotation Items in Local Storage
                        localStorage.setItem('item_code', doc.items[0].item_code);
                        localStorage.setItem('item_name', doc.items[0].item_name);
                        localStorage.setItem('description', doc.items[0].description);
                        localStorage.setItem('uom', doc.items[0].uom);
                        localStorage.setItem('rate', doc.items[0].rate);
                        localStorage.setItem('qty', doc.items[0].qty);
                        localStorage.setItem('yearly_sst', doc.items[0].yearly_sst);
                        // Get Monthly Table
                        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        
                        cur_frm.clear_table("monthly_billing");
                        months.forEach(month => {
                            frm.add_child('monthly_billing', {
                                month: month,
                                daily_rateresource: localStorage.getItem('rate')
                            });
                        });
                        frm.refresh_field('monthly_billing');
            });
        }
        
	},
	'get_yearly_bill': function(frm){
	    if(cur_frm.doc.name){
	        frm.save();
            frappe.db.get_doc("Quotation", cur_frm.doc.name)
                    .then(doc =>{
            	        let total_rate = 0;
            	        let total_sst = 0;
                        doc.monthly_billing.forEach(row=>{
                            total_rate += row.no_of_working_days * row.daily_rateresource;
                            total_sst += row.sstresource;
                            
                        });
                        cur_frm.clear_table("items");
                        frm.add_child('items', {
                            item_code: localStorage.getItem('item_code'),
                            item_name: localStorage.getItem('item_name'),
                            description: localStorage.getItem('description'),
                            uom: localStorage.getItem('uom'),
                            qty: localStorage.getItem('qty'),
                            rate: total_rate,
                            yearly_sst: total_sst,
                            amount: total_rate * localStorage.getItem('qty')
                        });
                        frm.refresh_field('items');
                    });
	    }
	}
});


frappe.ui.form.on("Quotation Item", "yearly_sst", function(frm, cdt, cdn) {
      var d = locals[cdt][cdn];
      frappe.model.set_value(cdt, cdn, "yearly_total_sst", d.qty * d.yearly_sst);
});

// Monthly billing calculations
frappe.ui.form.on("Monthly Billing", "no_of_working_days", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    frappe.model.set_value(cdt, cdn, "monthly_rate_resource", d.no_of_working_days * d.daily_rateresource);
    frappe.model.set_value(cdt, cdn, "sstresource", d.monthly_rate_resource*0.06);
    frappe.model.set_value(cdt, cdn, "month_wise_totalresourcerm", d.sstresource + d.monthly_rate_resource);
    frappe.model.set_value(cdt, cdn, "month_wise_total_sstrm_for_all_resources", localStorage.getItem('qty') * d.monthly_rate_resource);
    frappe.model.set_value(cdt, cdn, "month_wise_total_for_all_resourcesrm", localStorage.getItem('qty') * d.month_wise_totalresourcerm);
});
