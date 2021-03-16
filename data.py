opp = [{'count': 1, 'status': 'Working'},
       {'count': 2, 'status': 'Overdue'},
       {'count': 2, 'status': 'Open'},
       {'count': 1, 'status': 'Filed'},
       {'count': 20, 'status': 'Completed'},
       {'count': 1, 'status': 'Cancelled'}]

labels = []
values = []
dataset = {}
for i in range(len(opp)):
    values.append(opp[i]['count'])
    labels.append(opp[i]['status'])

data = {
    'labels': labels,
    'datasets': [
        {
            'name': '',
            'values': values
        },
    ]
}
print(data)
