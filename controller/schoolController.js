const response = require('../config/response');
const dbexec = require('../config/server');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('REST API MuhApps', res);
};

//getAll
exports.getAllSchool = function (req, res) {
  dbexec.query('SELECT * FROM sekolah', function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: 'Data Berhasil ditemukan',
        Data: rows,
      });
    }
  });
};

//getSchoolForApp
exports.getSchoolApp = function (req, res) {
  dbexec.query('SELECT nama_sekolah, akreditasi, photo FROM sekolah', function (error, rows) {
    if (error) {
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: 'Data Berhasil ditemukan',
        Data: rows,
      });
    }
  });
};

//getSchoolById
exports.getSchoolById = function (req, res) {
  const uuid_sekolah = req.params.uuid_sekolah;

  dbexec.query('SELECT * FROM ?? WHERE ??=?', ['sekolah', 'uuid_sekolah', uuid_sekolah], function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: 'Data Berhasil ditemukan',
        Data: rows,
      });
    }
  });
};

//insertSchool
exports.insertSchool = function (req, res) {
  let data = {
    uuid_sekolah: 'SCH' + req.body.npsn + req.body.akreditasi,
    npsn: req.body.npsn,
    nama_sekolah: req.body.nama_sekolah,
    akreditasi: req.body.akreditasi,
    jmlh_guru: req.body.jmlh_guru,
    jmlh_tendik: req.body.jmlh_tendik,
    jmlh_ptk: req.body.jmlh_ptk,
    jmlh_pd: req.body.jmlh_pd,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp,
    link_maps: req.body.link_maps,
    deskripsi: req.body.deskripsi,
    photo: req.file,
  };

  let queryInsert = 'INSERT INTO ?? SET ?';
  const tableSchool = 'sekolah';
  queryInsert = mysql.format(queryInsert, tableSchool);

  dbexec.query(queryInsert, data, function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      res.json({
        Status: 'Success',
        Message: 'Berhasil Menyimpan Data Sekolah',
        Data: rows,
      });
    }
  });
};

//updateSchool
exports.updateSchool = function (req, res) {};

//deleteSchool
exports.deleteSchool = function (req, res) {
  const uuid_sekolah = req.params.uuid_sekolah;

  dbexec.query('DELETE FROM ?? WHERE ??=?', ['sekolah', 'uuid_sekolah', uuid_sekolah], function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      res.json({
        Status: 'Success',
        Message: 'Data Berhasil Dihapuskan',
        Data: {
          uuid_sekolah: uuid_sekolah,
        },
      });
    }
  });
};
