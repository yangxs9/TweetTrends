const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'https://search-es-twitt-map-ir5ds3jwvskixnj3tgrcdphmi4.us-west-2.es.amazonaws.com'
});

function search(queryParams, callback) {
    if ('keyword' in queryParams && queryParams.keyword.trim() != '') {
        let params = {
            index: 'twitter',
            type: 'tweet',
            body: {
                size: 10,
                query: {
                    match: {
                        text: queryParams.keyword
                    }
                },
                sort: [
                    { timestamp_ms: { order: 'desc' } },
                ],
            }
        };
        if ('searchAfter' in queryParams) {
            params.body.search_after = [queryParams.searchAfter];
        }
        client.search(params).then(function(resp) {
            let hits = resp.hits.hits;
            let tweets = hits.map(hit => hit._source);
            callback(null, tweets);
        }, function(err) {
            callback(new Error(err.message));
        });
    } else {
        callback(new Error(`No keyword"`))
    }
    
}

module.exports = search;