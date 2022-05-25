const esClient = require('./es_client');

    const response =  esClient.search({
    index: 'bloq',
    type: 'example',
    body: {
        query: {
            match: {
                title: "Learn"
            }
        }
    }
});

console.log(response.hits.hits)







