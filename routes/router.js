const { config } = require('../config/server');

module.exports = function (app) {
  const main = require('../controller/mainController');
  app.route('/').get(main.indexPage);
};
