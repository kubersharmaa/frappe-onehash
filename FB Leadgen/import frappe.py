# Coded By Srijan
import frappe
from werkzeug.wrappers import Response


@frappe.whitelist(allow_guest=True)
def fb_events(**kwargs):
    # frappe.msgprint(kwargs["hub.mode"])
    # return kwargs["hub.challenge"]
    return Response(kwargs.get("hub.challenge"))
