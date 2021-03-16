frappe.pages['analyst-dashboard'].on_page_load = function (wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Analyst Dashboard',
        single_column: true
    });
    wrapper.lead_analytics = new erpnext.LeadAnalytics(wrapper);
    frappe.breadcrumbs.add("CRM");
}

erpnext.LeadAnalytics = class LeadAnalytics {
    constructor(wrapper) {
        var me = this;
        // 0 setTimeout hack - this gives time for canvas to get width and height
        setTimeout(function () {
            me.setup(wrapper);
            me.get_data();
        }, 0);
    }

    setup(wrapper) {
        var me = this;
        this.company_field = wrapper.page.add_field({
            "fieldtype": "Link",
            "fieldname": "company",
            "options": "Company",
            "label": __("Company"),
            "reqd": 1,
            "default": frappe.defaults.get_user_default('company'),
            change: function () {
                me.company = frappe.defaults.get_user_default('company') || this.value;
                me.get_data();
            }
        });

        this.elements = {
            layout: $(wrapper).find(".layout-main"),
            from_date: wrapper.page.add_date(__("From Date")),
            to_date: wrapper.page.add_date(__("To Date")),
            refresh_btn: wrapper.page.set_primary_action(__("Refresh"),
                function () { me.get_data(); }, "fa fa-refresh"),
        };

        this.elements.no_data = $('<div class="alert alert-warning">' + __("No Data") + '</div>')
            .toggle(false)
            .appendTo(this.elements.layout);

        this.elements.lead_wrapper = $(`<div class="col-md-12 d-flex flex-row flex-wrap lead-wrapper text-center" id="report-page">
                                            <div class="report" id="lead"></div>
                                            <div class="report" id="lead_by_source"></div>
                                            <div class="report" id="top_lead_owners"></div>
                                            <div class="report" id="sales_pipeline"></div>
                                            <div class="report" id="income_and_expense"></div>
                                            <div class="report" id="campaigns"></div>
                                        </div>`)
            .appendTo(this.elements.layout);

        this.company = frappe.defaults.get_user_default('company');
        this.options = {
            from_date: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
            to_date: frappe.datetime.get_today()
        };

        // set defaults and bind on change
        $.each(this.options, function (k, v) {
            if (['from_date', 'to_date'].includes(k)) {
                me.elements[k].val(frappe.datetime.str_to_user(v));
            } else {
                me.elements[k].val(v);
            }

            me.elements[k].on("change", function () {
                if (['from_date', 'to_date'].includes(k)) {
                    me.options[k] = frappe.datetime.user_to_str($(this).val()) != 'Invalid date' ? frappe.datetime.user_to_str($(this).val()) : frappe.datetime.get_today();
                }
                me.get_data();
            });
        });

        // bind refresh
        this.elements.refresh_btn.on("click", function () {
            me.get_data(this);
        });

        //  bind resize
        $(window).resize(function () {
            me.get_data();
        });
    }

    get_data(btn) {
        var me = this;
        if (!this.company) {
            frappe.throw(__("Please Select a Company."));
        }

        let reports = {
            "lead": {
                "title": "Lead",
                "chart_type": "bar",
                "parent": '#lead',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_lead_report"
            },
            "lead_by_source": {
                "title": "Lead by Source",
                "chart_type": "donut",
                "parent": '#lead_by_source',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_lead_by_source_report"
            },
            "top_lead_owners": {
                "title": "Top Lead Owners",
                "chart_type": "line",
                "parent": '#top_lead_owners',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_top_lead_owners_report"
            },
            "sales_pipeline": {
                "title": "Sales Pipeline",
                "chart_type": "percentage",
                "parent": '#sales_pipeline',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_sales_pipeline_report"
            },
            "income_and_expense": {
                "title": "Income & Expense",
                "chart_type": "pie",
                "parent": '#income_and_expense',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_income_and_expense_report"
            },
            "campaigns": {
                "title": "Campaigns",
                "chart_type": "pie",
                "parent": '#campaigns',
                "method": "erpnext.crm.page.analyst_dashboard.code.get_campaigns_report"
            }
        };
        for (const report in reports) {
            frappe.call({
                method: reports[report].method,
                args: {
                    from_date: this.options.from_date,
                    to_date: this.options.to_date,
                    company: this.company
                },
                btn: btn,
                callback: function (r) {
                    if (!r.exc) {
                        if (r.message != 'empty') {
                            let data = r.message;
                            me.render_chart(reports[report].title, reports[report].chart_type, data, reports[report].parent);
                        }
                    }
                }
            });
        };
    }
    render_chart(title, type, data, parent) {
        let currency = frappe.defaults.get_default("currency");

        const chart = new frappe.Chart(parent ? parent : null, {
            title: title,
            height: 320,
            data: data,
            type: type,
            stacked: (type == 'bar') ? 1 : 0,
            colors: ['light-blue', 'blue', 'violet', 'red', 'orange', 'yellow', 'green', 'light-green', 'purple', 'magenta', 'light-grey', 'dark-grey'],
            lineOptions: {
                regionFill: (type == 'line') ? 1 : 0
            },
            tooltipOptions: {
                formatTooltipY: d => format_currency(d, currency),
            }
        });
    }
};
