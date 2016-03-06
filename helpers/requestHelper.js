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

exports.makeGameRequest = function (type, req, response) {
    config.client.count({
      index: config.index,
      type: config.type,
      body: {
          filter: {
            term: {
              target: 'https://seestats.org/game/' + type
            }
          }
      }
    }).then((body) => {
      response.json({ success: true, count: body.count });
  }, (error) => {
      response.json({ success: false, message: error.message });
  });
};

exports.makeTodayCountRequests = function (req, response) {
    config.client.count({
      index: config.index,
      type: config.type,
      body: {
          filter: {
            term: {
              target: 'https://seestats.org/index.html'
            }
          }
      }
    }).then((body) => {
        response.json({ success: true, count: body.count });
  }, (error) => {
    response.json({ success: false, message: error.message });
  });
};

exports.makeTopTargetRequests = function (req, response) {
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
                '@timestamp': {
                  from: '2016-03-01',
                  to: '2016-03-07' },
              },
            },
          ],
        },
      },
      aggs: {
        results: {
          terms: {
            size: 20,
            field: "target"
          },
        },
      },
      }
    }).then((body) => {
      console.log(body);
        response.json({ success: true, count: body.aggregations.results.buckets });
  }, (error) => {
    response.json({ success: false, message: error.message });
  });
};