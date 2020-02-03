'use strict';

const _ = require('lodash');
const elasticsearch = require('elasticsearch');

exports.main = async (req, res) => {

  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
  });

  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
      //res.send('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
      //res.send('All is well');
    }
  });

  const query = {
    "query": {
      "multi_match": {
        "query": " car"
      }
    }
  };

  const response = await client.search({
    index: 'vehicles_test',
    type: '_doc',
    body: query
  });

  const vehicles = [];

  for (const v of response.hits.hits) {
    vehicles.push(v);
  }

  res.send(vehicles);

};
