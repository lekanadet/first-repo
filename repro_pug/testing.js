const express = require('express')
var cors = require('cors')
var app = express()
var elasticsearch = require('elasticsearch');



app.get('/tweet_search', function (req, res) { 
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

try {
  const response = await client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
})
 
for (const tweet of response.hits.hits) {
  console.log('tweet:', tweet);
}
} catch (error) {
  console.trace(error.message)
}

})


app.get('/tweet_search2', function (req, res) { 
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
  });
  
  let q = 'elasticsearch';


( async query => {
    try {
        const response = await client.search({
            q: query
        });
        console.log("Results found:", response.hits.hits.length)
        response.hits.hits.forEach( h => {
            let {_source, ...params } = h;
            console.log("Result found in file: ", params._id, " with score: ", params._score)
        })
    } catch (error) {
        console.trace(error.message)
    }
})(q)
  
  })
  
  


// Home page route.

app.get('/', function (req, res) { 
    res.send('Elastic Search testing');
})



app.route('/') 
  .get(function (req, res) { 
      res.send('Home page Check');
})

// About page route.
app.route('/about')
.get(function (req, res) {
  res.send('About this wiki');
})

app.listen(9200,() => {
  console.log("server is up on port 9200")
})