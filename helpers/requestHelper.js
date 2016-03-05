'use strict';

const config = require(`${__dirname}/../config/init`);

/**
 * makeAllRowRequestBody(str)
 * @param string field Field to query parameters from.
 * @param string from Date to query results from.
 * @param string to Date to query results to.
 * @return object Request to be performed body.
 */
exports.makeAllRowRequest = function make(field, size, from, to, response) {
  config.client.search({
    index: config.index,
    type: config.type,
    body: {
      size: 0,
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
        results: {
          terms: {
            size,
            field,
          },
        },
      },
    },
  }).then((body) => {
    response.json({ success: true, hits: body.aggregations.results.buckets });
  }, (error) => {
    response.json({ success: false, message: error.message });
  });
};