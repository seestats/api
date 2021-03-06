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
                  to: '2016-03-30' },
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
        response.json({ success: true, count: body.aggregations.results.buckets });
  }, (error) => {
    response.json({ success: false, message: error.message });
  });
};

exports.makeUniqueTargetsRequests = function (req, res) {
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
                  to: '2016-03-30' },
              },
            },
          ],
        },
      },
      aggs: {
        results: {
          cardinality: {
            field: "target"
          },
        },
      },
      }
    }).then((body) => {
        res.json({ success: true, count: body.aggregations.results.value });
  }, (error) => {
    res.json({ success: false, message: error.message });
  });
};

exports.makeCurrentlyActiveConnectionRequests = function (req, res) {
    const from = Date.now() - (60*60*1000);
    const to = Date.now();

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
                  from,
                  to },
              },
            },
          ],
        },
      },
      aggs: {
        results: {
          sum: {
            field: "traffic"
          },
        },
      },
      }
    }).then((body) => {
        res.json({ success: true, count: body.aggregations.results.value });
  }, (error) => {
    res.json({ success: false, message: error.message });
  });
};

exports.makeStatusCodeList = function (req, res) {
    const from = Date.now() - (60*60*1000);
    const to = Date.now();

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
                  from,
                  to },
              },
            },
          ],
        },
      },
      aggs: {
        results: {
          terms: {
            field: "status_code"
          },
        },
      },
      }
    }).then((body) => {
        res.json({ success: true, count: body.aggregations.results.buckets });
  }, (error) => {
    res.json({ success: false, message: error.message });
  });
};
