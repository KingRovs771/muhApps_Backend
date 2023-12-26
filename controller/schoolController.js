const response = require('../config/response');
const dbexec = require('../config/server');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('REST API MuhApps', res);
};
