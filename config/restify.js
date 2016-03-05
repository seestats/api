'use strict';

const restify = require('restify');
const restifyRoutes = require('restify-routes');

const server = restify.createServer({
  name: 'see-stats-api',
});

server.use(restify.queryParser());

server.pre(restify.pre.sanitizePath());

restifyRoutes.set(server, `${__dirname}/../routes`);

module.exports = server;
