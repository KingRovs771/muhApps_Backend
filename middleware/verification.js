const jwt = require('jsonwebtoken');
const config = require('../secret/secret');

function verification(req, res, next) {
  let tokenWithBearer = req.headers.authorization;

  if (tokenWithBearer) {
    let token = tokenWithBearer.split(' ')[1];

    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(201).send({ auth: false, message: 'Token tidak terdaftar !' });
      } else {
        req.auth = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: 'Token tidak tersedia' });
  }
}

module.exports = verification;
