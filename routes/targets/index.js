const targetsController = require('../../controllers/targets.js');

module.exports = {
  '/targets/top10': {
    get: function get(req, res, cb) {
      return cb(targetsController.getTargetList(req, res));
    },
  },
};
