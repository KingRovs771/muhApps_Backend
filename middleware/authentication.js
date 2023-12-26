const dbexec = require('../config/server');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../config/response');
const jwt = require('jsonwebtoken');
const config = require('../secret/secret');
const ip = require('ip');
const { query } = require('express');

exports.loginUser = function (req, res) {
  let dataLogin = {
    email: req.body.email,
    password: req.body.password,
  };

  let queryLogin = 'SELECT * FROM ?? WHERE ?? = ? AND ??=?';
  let table = ['user', 'email', dataLogin.email, 'password', md5(dataLogin.password)];

  queryLogin = mysql.format(queryLogin, table);

  dbexec.query(queryLogin, function (error, rows) {
    if (error) {
      //console.log(error);
      res.json({
        Error: true,
        Messgae: 'Server sedang bermasalah mohon coba lagi',
        values: error,
      });
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({ rows }, config.secret, {
          expiresIn: '2400000',
        });

        userId = rows[0].uid_user;

        let expired = 2400000;

        let data = {
          uuid_user: userId,
          generate_token: token,
          ip_address: ip.address(),
        };

        let query = 'INSERT INTO ?? SET ?';
        let tablev = ['token_akses'];

        query = mysql.format(query, tablev);
        dbexec.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              Success: true,
              Message: 'Token Berhasil Di Generate',
              Token: token,
              userId: data.uuid_user,
              nama_lengkap: rows[0].nama_lengkap,
              expired: expired,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: 'Email or Password Invalid, Please Try Again !!' });
      }
    }
  });
};
