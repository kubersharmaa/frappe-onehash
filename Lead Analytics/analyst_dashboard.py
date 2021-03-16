# Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and Contributors
# License: GNU General Public License v3. See license.txt

from __future__ import unicode_literals
import frappe

from frappe import _
from erpnext.accounts.report.utils import convert
import pandas as pd


def validate_filters(from_date, to_date, company):
    if from_date and to_date and (from_date >= to_date):
        frappe.throw(_("To Date must be greater than From Date"))

    if not company:
        frappe.throw(_("Please Select a Company"))


@frappe.whitelist()
def get_lead_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)

    leads = frappe.db.get_list(
        'Lead',
        filters={
            'company': ('in', (company, ''))
        },
        fields=['count(name) as count']
    )

    if leads:
        labels = ['Lead']
        values = []
        dataset = {}
        for i in range(len(leads)):
            values.append(leads[i]['count'])
        data = {
            'labels': labels,
            'datasets': [
                {
                    'name': '',
                    'values': values
                },
            ]
        }
        return data
    else:
        return 'empty'


@ frappe.whitelist()
def get_lead_by_source_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)

    leads = frappe.db.get_list(
        'Lead',
        filters={
            'company': ('in', (company, ''))
        },
        fields=['count(name) as count', 'source'],
        group_by='source'
    )

    if leads:
        labels = []
        values = []
        dataset = {}
        for i in range(len(leads)):
            labels.append(leads[i]['source'])
            values.append(leads[i]['count'])
        data = {
            'labels': labels,
            'datasets': [
                {
                    'name': '',
                    'values': values
                },
            ]
        }
        return data
    else:
        return 'empty'


@ frappe.whitelist()
def get_top_lead_owners_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)

    lead_owners = frappe.get_list(
        'Lead',
        filters={
            'company': ('in', (company, ''))
        },
        fields=['count(name) as count', 'lead_owner'],
        group_by='lead_owner'
    )

    if lead_owners:
        labels = []
        values = []
        dataset = {}
        for i in range(len(lead_owners)):
            labels.append(lead_owners[i]['lead_owner'])
            values.append(lead_owners[i]['count'])
        data = {
            'labels': labels,
            'datasets': [
                {
                    'name': '',
                    'values': values
                },
            ]
        }
        return data
    else:
        return 'empty'


@ frappe.whitelist()
def get_sales_pipeline_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)

    opportunities = frappe.get_list(
        "Opportunity",
        filters=[['status', 'in', ['Open', 'Quotation', 'Replied']], ['company', 'in', [company, '']], [
            'transaction_date', 'Between', [from_date, to_date]]],
        fields=['currency', 'sales_stage', 'opportunity_amount', 'probability']
    )

    if opportunities:
        default_currency = frappe.get_cached_value(
            'Global Defaults', 'None',  'default_currency')
        cp_opportunities = [dict(x, **{'compound_amount': (convert(x['opportunity_amount'], x['currency'],
                                                                   default_currency, to_date) * x['probability']/100)}) for x in opportunities]

        df = pd.DataFrame(cp_opportunities).groupby(
            ['sales_stage'], as_index=True).agg({'compound_amount': 'sum'}).to_dict()

        result = {}
        result['labels'] = df['compound_amount'].keys()
        result['datasets'] = []
        result['datasets'].append({
            'name': _("Total Amount"),
            'values': df['compound_amount'].values(), 'chartType': 'bar'}
        )

        return result

    else:
        return 'empty'


@ frappe.whitelist()
def get_income_and_expense_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)
    result = {}
    result['labels'] = ['Walk In', 'Ad Campaigns', 'Mass Mailing']
    result['datasets'] = [{'values': [10, 20, 30]}]

    return result


@ frappe.whitelist()
def get_campaigns_report(from_date, to_date, company):
    validate_filters(from_date, to_date, company)

    campaigns = frappe.db.get_list(
        'Lead',
        filters={
            'source': 'Campaign',
            'company': ('in', (company, ''))
        },
        fields=['count(name) as count', 'campaign_name'],
        group_by='campaign_name'
    )

    if campaigns:
        labels = []
        values = []
        dataset = {}
        for i in range(len(campaigns)):
            labels.append(campaigns[i]['campaign_name'])
            values.append(campaigns[i]['count'])
        data = {
            'labels': labels,
            'datasets': [
                {
                    'name': '',
                    'values': values
                },
            ]
        }
        return data
    else:
        return 'empty'
