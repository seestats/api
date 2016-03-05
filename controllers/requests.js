'use strict';

const dateHelper = require(`${__dirname}/../helpers/dateHelper`);
const requestHelper = require(`${__dirname}/../helpers/requestHelper`);

exports.getRowRequest = (field, req, res) => {
  if (dateHelper.isValidDate(req.query.from) && dateHelper.isValidDate(req.query.to)) {
    requestHelper.makeAllRowRequest(field, req.query.from, req.query.to, res);
  } else {
    res.json({ success: false, message: 'Bad date formatting' });
  }
};