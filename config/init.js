'use strict';

const elasticsearch = require('elasticsearch');
const moment = require('moment');
const date = moment(Date.now()).format('YYYY.MM.DD');

module.exports = {
  index: `see-stats-${date}`,
  type: 'raw',
  port: 8080,
  client: new elasticsearch.Client({
    host: 'https://es.seestats.org/',
    log: 'trace',
  }),
};
