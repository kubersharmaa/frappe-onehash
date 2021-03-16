from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.lead import Lead
from facebook_business.api import FacebookAdsApi

access_token = '<ACCESS_TOKEN>'
app_secret = '307fc2bff45bf2bac9871a5d58e57227'
app_id = '244490387306438'
id = '252635333088876'
FacebookAdsApi.init(access_token=access_token)

fields = [
]
params = {
}
print Ad(id).get_leads(
  fields=fields,
  params=params,
)