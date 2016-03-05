'use strict';

const dateHelper = require(`${__dirname}/../helpers/dateHelper`);
const requestHelper = require(`${__dirname}/../helpers/requestHelper`);

exports.getTargetList = (req, res) => {
  if (dateHelper.isValidDate(req.query.from) && dateHelper.isValidDate(req.query.to)) {
    requestHelper.makeAllRowRequest('target', req.query.from, req.query.to, res);
  } else {
    res.json({ success: false, message: 'Bad date formatting' });
  }
};

exports.getSingleTargetStats = (req, res) => {
  if (dateHelper.isValidDate(req.query.from) && dateHelper.isValidDate(req.query.to)) {
    requestHelper.getSingleRowStatisticsByField(req, res, 'target', 'target');
  } else {
    res.json({ success: false, message: 'Bad date formatting' });
  }
};
