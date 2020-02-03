'use strict';

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: 'http://localhost:9200'
});

async function ping() {
  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      return false
    } else {
      return true;
    }
  });
};

exports.main = async (req, res) => {

  if(!ping()) return;

  const { body } = await client.search({
    index: 'vehicles_test',
    type: '_doc',
    body: {
      query: {
        multi_match: {
          query: 'car'
        }
      }
    }
  });

    const vehicles = [];

    for (const v of body.hits.hits) {
      vehicles.push(v);
    }

    res.send(vehicles);

};
