const requestsController = require('../../controllers/requests.js');
const requestHelper = require('../../helpers/requestHelper.js');

module.exports = {
  '/:request/top/:size': {
    get: function get(req, res, cb) {
    	const size = parseInt(req.params.size);
    	res.setHeader('Access-Control-Allow-Origin', '*');

    	if (typeof size == 'number' && size > 5) {
    		requestsController.getRowRequest(req.params.request, size, req, res);
    	} else {
    		res.json({ success: false, message: 'Invalid size parameter'});
    	}
    },
  },
  '/game/:type': {
    get: function get (req, res, cb) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        requestsController.getGameRequest(req.params.type, req, res);
    },
  },
  '/getTodayHits': {
      get: function get(req, res, cb) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        requestsController.getTodaysRequests(req, res);
      },
  }
};
