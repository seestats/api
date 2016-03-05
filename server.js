'use strict';

const app = require('./config/restify');
const config = require('./config/init');

app.listen(config.port);
