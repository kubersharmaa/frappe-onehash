//Number Validation for Distributor
frappe.ui.form.on("Sales Order", {
    validate: function (frm) {
        let mobile_num = frm.doc.distributor_mobile_number;
        let regExp = new RegExp("(^[0-9]{10})$");
        if (frm.doc.distributor_mobile_number) {
            if (regExp.test(mobile_num) === false) {

                frappe.msgprint(__("Mobile Number must be of 10 digits "));
                frappe.validated = false;
            }
        }
        else {
            frappe.msgprint(__("Please enter the Distributor Mobile Number"));
            frappe.validated = false;
        }
    }
});

//Distributor Whatsapp
frappe.ui.form.on('Sales Order', {
    onload_post_render: function (frm) {

        // Customer Group is Distributer
        if (frm.doc.customer_group == "Distributor") {
            frm.add_custom_button(__('Send to Distributor'), function () {
                if (!frm.doc.distributor_mobile_number) {
                    frappe.msgprint(__("Please Update Distributor WhatsApp Number First."));
                    return false;
                }
                var whatsapp_num = frm.doc.country_code + frm.doc.mobile_number;
                let sales_order_data = frm.doc;
                console.log(sales_order_data);
                var retail_outlet_details = "";
                var item_details = "";

                retail_outlet_details += '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer</label></br>' + frm.doc.sales_officer + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer Mobile Number</label></br>' + frm.doc.sales_officer_mobile_no + '</div></div>';

                sales_order_data.items.forEach((item, key) => {

                    item_details += '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Quantity</label><br>' + item.qty + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Item Name</label><br>' + item.item_code + '</div></div><hr>';

                });
                let dialog = new frappe.ui.Dialog({
                    title: "Sales Order Details",

                    'fields': [
                        { 'fieldtype': 'Section Break', 'label': "Contact Details" },
                        { 'fieldname': 'retail_outlet_info', 'fieldtype': 'HTML' },
                        { 'fieldtype': 'Section Break', 'label': "Item Details" },
                        { 'fieldname': 'item_info', 'fieldtype': 'HTML' }
                    ],
                    primary_action: function () {
                        let values = dialog.get_values();
                        console.log(values);
                        let mobile_num = frm.doc.country_code + frm.doc.distributor_mobile_number;
                        let whatsapp_message = 'https://api.whatsapp.com/send?phone=' + mobile_num + `&text=*Sales Order* *:* ${frm.doc.name}%0a%0a`;


                        sales_order_data.items.forEach((item, key) => {
                            whatsapp_message += `*Item Name* *:* ${item.item_code}%0a*Item Quantity* *:* ${item.qty}%0a%0a`;
                        });

                        window.open(whatsapp_message, 'WhatsApp');
                    }
                });

                dialog.fields_dict.retail_outlet_info.$wrapper.html(retail_outlet_details);
                dialog.fields_dict.item_info.$wrapper.html(item_details);
                dialog.show();
            }, __('WhatsApp'));
            console.log(frm.doc);
        }

        // Customer Group is not Distributer
        if (frm.doc.customer_group != "Distributor") {

            // Send to Distributer
            frm.add_custom_button(__('Send to Distributor'), function () {
                if (!frm.doc.distributor_mobile_number) {
                    frappe.msgprint(__("Please Update Distributor WhatsApp Number First."));
                    return false;
                }
                var whatsapp_num = frm.doc.country_code + frm.doc.mobile_number;
                let sales_order_data = frm.doc;
                console.log(sales_order_data);
                var retail_outlet_details = "";
                var item_details = "";

                retail_outlet_details += '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Shop Owner</label></br>' + frm.doc.customer + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Shop Owner Contact</label></br>' + frm.doc.shopowner_whatsapp_number + '</div></div>' +
                    '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer</label></br>' + frm.doc.sales_officer + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer Mobile Number</label></br>' + frm.doc.sales_officer_mobile_no + '</div></div>';

                sales_order_data.items.forEach((item, key) => {

                    item_details += '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Quantity</label><br>' + item.qty + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Item Name</label><br>' + item.item_code + '</div></div><hr>';

                });
                let dialog = new frappe.ui.Dialog({
                    title: "Sales Order Details",

                    'fields': [
                        { 'fieldtype': 'Section Break', 'label': "Contact Details" },
                        { 'fieldname': 'retail_outlet_info', 'fieldtype': 'HTML' },
                        { 'fieldtype': 'Section Break', 'label': "Item Details" },
                        { 'fieldname': 'item_info', 'fieldtype': 'HTML' }
                    ],
                    primary_action: function () {
                        let values = dialog.get_values();
                        console.log(values);
                        let mobile_num = frm.doc.country_code + frm.doc.distributor_mobile_number;
                        let whatsapp_message = 'https://api.whatsapp.com/send?phone=' + mobile_num + `&text=*Sales Order* *:* ${frm.doc.name}%0a%0a`;

                        sales_order_data.items.forEach((item, key) => {
                            whatsapp_message += `*Item Name* *:* ${item.item_code}%0a*Item Quantity* *:* ${item.qty}%0a%0a`;
                        });

                        window.open(whatsapp_message, 'WhatsApp');
                    }
                });

                dialog.fields_dict.retail_outlet_info.$wrapper.html(retail_outlet_details);
                dialog.fields_dict.item_info.$wrapper.html(item_details);
                dialog.show();
            }, __('WhatsApp'));
            // Send to Retailer
            frm.add_custom_button(__('Send to Retailer'), function () {
                if (!frm.doc.shopowner_whatsapp_number) {
                    frappe.msgprint(__("Please Update Shop Owner's WhatsApp Number First."));
                    return false;
                }
                //var whatsapp_num = frm.doc.country_code + frm.doc.shopowner_whatsapp_number;
                let sales_order_data = frm.doc;
                console.log(sales_order_data);
                var distributor_details = "";
                var item_section = "";
                distributor_details += //'<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Distributor Name</label></br>' + frm.doc.distributor + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Distributor Mobile Number</label></br>' + frm.doc.distributor_mobile_number + '</div></div>'+
                    '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer Name</label></br>' + frm.doc.sales_officer + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Sales Officer Mobile Number</label></br>' + frm.doc.sales_officer_mobile_no + '</div></div>';
                sales_order_data.items.forEach((item, key) => {

                    item_section += '<div class="row"><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Quantity</label><br>' + item.qty + '<br></div><div class="col-sm-6"><label class="control-label" style="padding-right: 0px;">Item Name</label><br>' + item.item_code + '</div></div><hr>';

                });
                let dialog = new frappe.ui.Dialog({
                    title: "Sales Order Details",

                    'fields': [
                        { 'fieldtype': 'Section Break', 'label': "Contact Details" },
                        { 'fieldname': 'distributor_info', 'fieldtype': 'HTML' },
                        { 'fieldtype': 'Section Break', 'label': "Item Details" },
                        { 'fieldname': 'item_info', 'fieldtype': 'HTML' }
                    ],
                    primary_action: function () {
                        let values = dialog.get_values();
                        console.log(values);
                        let shop_owner_mobile_number = frm.doc.country_code + frm.doc.shopowner_whatsapp_number;
                        let whatsapp_message = 'https://api.whatsapp.com/send?phone=' + shop_owner_mobile_number + `&text=*Sales Order* *:* ${frm.doc.name}%0a%0a*Distributor Name* *:* ${frm.doc.distributor}%0a*Distributor Contact* *:* ${frm.doc.distributor_mobile_number}%0a%0a*Sales Officer* *:* ${frm.doc.sales_officer}%0a*Sales Officer Contact* *:* ${frm.doc.sales_officer_mobile_no}%0a%0a`;
                        sales_order_data.items.forEach((item, key) => {
                            whatsapp_message += `*Item Name* *:* ${item.item_code}%0a*Item Quantity* *:* ${item.qty}%0a%0a`;
                        });

                        window.open(whatsapp_message, 'WhatsApp');
                    }
                });

                dialog.fields_dict.distributor_info.$wrapper.html(distributor_details);
                dialog.fields_dict.item_info.$wrapper.html(item_section);
                dialog.show();
            }, __('WhatsApp'));


        }
    }
});




/*frappe.ui.form.on("Sales Order", {
    shopowner_whatsapp_number: function(frm){
        let shop_owner_mobile_number = frm.doc.shopowner_whatsapp_number;
        let regExpression = new RegExp("(^[0-9]{10})$");
        if(frm.doc.shopowner_whatsapp_number)
        {
            if (regExpression.test(shop_owner_mobile_number)===false) {

                frappe.msgprint(__("Mobile Number must be of 10 digits "));
                frappe.validated = false;
            }
        }
        else
        {
            frappe.msgprint(__("Please enter the Shop Owner Mobile Number"));
            frappe.validated = false;
        }
    }
});
frappe.ui.form.on('Sales Order', {
    refresh(frm) {
        frm.add_custom_button(__("Retail Shop WhatsApp"), function () {


        });
    }
});

//Distributor Whatsapp Button
frappe.ui.form.on("Sales Order", {
    validate: function(frm){
        let mobile_num = frm.doc.distributor_mobile_number;
        let regExp = new RegExp("(^[0-9]{10})$");
        if(frm.doc.distributor_mobile_number)
        {
            if (regExp.test(mobile_num)===false) {

                frappe.msgprint(__("Mobile Number must be of 10 digits "));
                frappe.validated = false;
            }
        }
        else
        {
            frappe.msgprint(__("Please enter the Distributor Mobile Number"));
            frappe.validated = false;
        }
    }
});


frappe.ui.form.on('Sales Order', {
    refresh(frm) {
        frm.add_custom_button(__("Distributor WhatsApp"), function () {


        });
    }
});*/