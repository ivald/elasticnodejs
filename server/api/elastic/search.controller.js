'use strict';

require('array.prototype.flatmap').shim();
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

exports.createInventoryTypeIndex = async (req, res) => {
  // client.indices.exists({index: 'inventory_type'}, (err, respond, status) => {
  //   if (respond) {
  //     console.log('index already exists');
  //     res.send('Index inventory_type already exists.');
  //   } else {
      run().catch(console.log);
      res.send('Index inventory_type was created.');
  //   }
  // });
};

exports.vehicles_test = async (req, res) => {

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

async function run () {
  await client.indices.create({
    index: 'inventory_type',
    body: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          text: { type: 'text' },
          time: { type: 'date' }
        }
      }
    }
  }, { ignore: [400] })

  const dataset = [{
    id: 1,
    text: 'Balloon',
    date: new Date()
  }, {
    id: 2,
    text: 'CCD',
    date: new Date()
  }, {
    id: 3,
    text: 'Company Car',
    date: new Date()
  }, {
    id: 4,
    text: 'Company Vehicle',
    date: new Date()
  }, {
    id: 5,
    text: 'Corporate Fleet',
    date: new Date()
  }, {
    id: 6,
    text: 'Dealer Owned',
    date: new Date()
  }, {
    id: 7,
    text: 'Employee Choice',
    date: new Date()
  }, {
    id: 8,
    text: 'Employee Lease',
    date: new Date()
  }, {
    id: 9,
    text: 'Fleet',
    date: new Date()
  }, {
    id: 10,
    text: 'Manufacturer\'s Repurchase',
    date: new Date()
  }, {
    id: 11,
    text: 'Not Provided',
    date: new Date()
  }, {
    id: 12,
    text: 'Off Balloon',
    date: new Date()
  }, {
    id: 13,
    text: 'Off Lease',
    date: new Date()
  }, {
    id: 14,
    text: 'Off Lease/Repo',
    date: new Date()
  }, {
    id: 15,
    text: 'Pre-Term Purchase',
    date: new Date()
  }, {
    id: 16,
    text: 'Promo',
    date: new Date()
  }, {
    id: 17,
    text: 'Rental',
    date: new Date()
  }, {
    id: 18,
    text: 'Repo',
    date: new Date()
  }, {
    id: 19,
    text: 'Retail',
    date: new Date()
  }, {
    id: 20,
    text: 'Retail Balloon',
    date: new Date()
  }, {
    id: 21,
    text: 'Salvage',
    date: new Date()
  }, {
    id: 22,
    text: 'Service Loaner',
    date: new Date()
  }, {
    id: 23,
    text: 'Specialty',
    date: new Date()
  }, {
    id: 24,
    text: 'Theft Recovery',
    date: new Date()
  }, {
    id: 25,
    text: 'Trade-in',
    date: new Date()
  }];

  const body = dataset.flatMap(doc => [{ index: { _index: 'inventory_type' } }, doc]);

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const { body: count } = await client.count({ index: 'inventory_type' })
  console.log(count)
}
