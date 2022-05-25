const esClient = require('./es_client');

const data = {
    title: "Improve on Elastic Search",
    tags: ['NodeJS', 'Programming'],
    body: `This is the body of the article`
}

esClient.index({
    index: 'blog',
    type:'example',
    id: 4,
    body: data
});






