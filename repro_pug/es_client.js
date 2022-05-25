const express = require('express')
var cors = require('cors')
var app = express()
const es = require('elasticsearch');



const esClient = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

module.exports = esClient;

