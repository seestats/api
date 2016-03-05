const requestsController = require('../../controllers/requests.js');
const requestHelper = require('../../helpers/requestHelper.js');

module.exports = {
  '/:request/top10': {
    get: function get(req, res, cb) {
    	res.setHeader('Access-Control-Allow-Origin', '*');
    	requestsController.getRowRequest(req.params.request, req, res);
    },
  },
};
