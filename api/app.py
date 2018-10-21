from chalice import Chalice
import boto3

app = Chalice(app_name='cgi-api')
app.debug = True

@app.route('/')
def index():
    return {'hello': 'world'}

cloudsearch_endpoint = "https://search-tweets-b4d26kjdlcfqt53fkw4afyzjde.us-east-1.cloudsearch.amazonaws.com"
client = boto3.client('cloudsearchdomain', region_name='us-east-1', endpoint_url=cloudsearch_endpoint)

@app.route('/search', cors=True)
def index():
    query = app.current_request.query_params.get("query", "")
    start = int(app.current_request.query_params.get('start', 0))
    size = int(app.current_request.query_params.get('size', 100))
    # filter_type = app.current_request.query_params.get('filter', None)

    # if filterQuery:
    #     results = client.search(start=start, size=size, query=query, filterQuery=filterQuery, queryOptions=json.dumps(queryOptions))
    # else:
    results = client.search(start=start, size=size, query=query)
    print(results)
    return results
