const response = require('../config/response');
const dbexec = require('../config/server');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('Hello World Teacher', res);
};

exports.getAllTeacher = function (req, res) {
  dbexec.query(
    'SELECT uid_guru, jabatan, jenis_kelamin, golongan, pendidikan, agama, tempat_lahir, tgl_lahir, alamat_guru, no_hp, email, photo, mapel_sekolah.nama_mapel, sekolah.nama_sekolah FROM teacher INNER JOIN mapel_sekolah ON teacher.kd_mapel = mapel_sekolah.uid_mapel INNER JOIN sekolah ON teacher.kd_sekolah = sekolah.uid_sekolah ORDER BY nama_guru',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        res.json(
          {
            Error: false,
            Message: 'Data Berhasil didapatkan',
            data: {
              uid_guru: rows[0].uid_guru,
              nama_guru: rows[0].nama_guru,
            },
          },
          res
        );
      }
    }
  );
};

exports.getTeacherById = function (req, res) {
  let id_teacher = req.params.uid_guru;

  (dbexec.query = 'SELECT * FROM ?? INNER JOIN mapel_sekolah ON teacher.kd_mapel = mapel_sekolah.uid_mapel INNER JOIN sekolah ON teacher.kd_sekolah = sekolah.uid_sekolah WHERE ?? = ?'),
    ['teacher', 'teacher', id_teacher],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.json({
          Error: true,
          Message: 'Terdapat Kesalahan',
        });
      } else {
        res.json(
          {
            Error: false,
            Status: 'Success',
            Message: 'Berhasil mendapatkan data',
            Data: {},
          },
          res
        );
      }
    };
};

exports.updateGuru = function (req, res) {
  let uid_guru = req.body.uid_guru;

  dbexec.query('UPDATE ?? SET ??=?,', [], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: ' Data Berhasil di update',
      });
    }
  });
};
