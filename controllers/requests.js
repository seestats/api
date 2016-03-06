'use strict';

const dateHelper = require(`${__dirname}/../helpers/dateHelper`);
const requestHelper = require(`${__dirname}/../helpers/requestHelper`);

exports.getRowRequest = (field, size, req, res) => {
  if (dateHelper.isValidDate(req.query.from) && dateHelper.isValidDate(req.query.to)) {
    requestHelper.makeAllRowRequest(field, size, req.query.from, req.query.to, res);
  } else {
    res.json({ success: false, message: 'Bad date formatting' });
  }
};

exports.getGameRequest = (type, req, res) => {
	requestHelper.makeGameRequest(type, req, res);
};

exports.getTodaysRequests = (req, res) => {
	requestHelper.makeTodayCountRequests(req, res);
};

exports.getTopTargets = (req, res) => {
	requestHelper.makeTopTargetRequests(req, res);
};