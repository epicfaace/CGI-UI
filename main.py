from chalice import Chalice
import boto3
import json
import os

cloudsearch_endpoint = "http://search-devices-ib3ofw5djtwedeagxfz6yzph7e.us-east-1.cloudsearch.amazonaws.com"


client = boto3.client('cloudsearchdomain', region_name='us-east-1', endpoint_url=cloudsearch_endpoint)

@app.route('/search', cors=True)
def index():
    userQuery = app.current_request.query_params['query']
    start = int(app.current_request.query_params.get('start', 0))
    size = int(app.current_request.query_params.get('size', 100))
    # filter_type = app.current_request.query_params.get('filter', None)

    # if filterQuery:
    #     results = client.search(start=start, size=size, query=query, filterQuery=filterQuery, queryOptions=json.dumps(queryOptions))
    # else:
    results = client.search(start=start, size=size, query=query, queryOptions=json.dumps(queryOptions))
    results = results['hits']
    return results