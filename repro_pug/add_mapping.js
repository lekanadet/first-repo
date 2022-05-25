const esClient = require('./es_client');

const mapping = {
    properties: {
        title: {
            type: "text"
        },
        body: {
            type: "text"
        },
        timestamp: {
            type: "date",
            format: "epoch_millis"
        }
    }
}

esClient.indices.putMapping({
    index: 'book',
    body: mapping
});






