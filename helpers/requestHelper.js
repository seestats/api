'use strict';

const config = require(`${__dirname}/../config/init`);

/**
 * makeAllRowRequestBody(str)
 * @param string field Field to query parameters from.
 * @param string from Date to query results from.
 * @param string to Date to query results to.
 * @return object Request to be performed body.
 */
exports.makeAllRowRequest = function make(field, from, to, response) {
  config.client.search({
    index: config.index,
    type: config.type,
    body: {
      size: 10,
      query: {
        bool: {
          must: [
            {
              range: {
                "@timestamp": { from, to },
              },
            },
          ],
        },
      },
      aggs: {
        clients: {
          terms: {
            size: 0,
            field,
          },
        },
      },
    },
  }).then((body) => {
    response.json({ success: true, hits: body.aggregations.clients.buckets });
  }, (error) => {
    response.json({ success: false, message: error.message });
  });
};