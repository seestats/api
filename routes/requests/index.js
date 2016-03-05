const requestsController = require('../../controllers/requests.js');
const requestHelper = require('../../helpers/requestHelper.js');

module.exports = {
  '/:request/top10': {
    get: function get(req, res, cb) {
    	requestsController.getRowRequest(req.params.request, req, res);
    },
  },
};
