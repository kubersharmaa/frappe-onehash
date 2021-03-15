// Custom Script to get Opportunity Details from a particular Lead in a dialog box.

frappe.ui.form.on("Lead", "refresh", function (frm) {
    frm.add_custom_button("Get Opportunity Data", () => {

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                'doctype': "Opportunity",
                'filters': { 'party_name': frm.doc.name },
                'fields': [
                    'title',
                    'name',
                    'transaction_date'
                ]
            },
            callback: function (r) {
                if (!r.exc) {
                    let opportunity_list = r.message;
                    let OpportunityHTML = "<div>"
                        + "<table style='width: 100%'>"
                        + "<tr>"
                        + "<th>Opportunity Name</th>"
                        + "<th>Opportunity No.</th>"
                        + "<th>Opportunity Date</th>"
                        + "</tr>";
                    opportunity_list.forEach(element => {
                        OpportunityHTML += "<tr>"
                            + "<td> " + element.title + " </td>"
                            + "<td> " + element.name + " </td>"
                            + "<td> " + element.transaction_date + " </td>"
                            + "</tr>";
                    });
                    OpportunityHTML += "</table></div>";
                    var d = new frappe.ui.Dialog({
                        title: "Opportunity Details",
                        fields: [
                            { 'fieldname': "opportunity_table", 'fieldtype': "HTML" }
                        ],
                        primary_action: () => {
                            d.hide();
                        }
                    });

                    d.fields_dict.opportunity_table.$wrapper.html(OpportunityHTML);
                    d.show();
                }
            }
        });
    });
});