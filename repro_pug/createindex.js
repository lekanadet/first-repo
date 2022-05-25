const { bgYellowBright } = require('chalk');
const esClient = require('./es_client');


esClient.indices.create({
  index: 'book'
});




