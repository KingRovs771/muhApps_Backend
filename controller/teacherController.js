const { text } = require('body-parser');
const response = require('../config/response');
const dbexec = require('../config/server');
const mysql = require('mysql');
const multer = require('multer');

exports.indexPage = function (req, res) {
  response.success('Hello World Teacher', res);
};

exports.getAllTeacher = function (req, res) {
  dbexec.query(
    'SELECT uuid_guru, nama_guru, jabatan, jenis_kelamin, golongan, pendidikan, agama, tempat_lahir, tgl_lahir, alamat_guru, no_hp, email, photo_guru, mapel_sekolah.nama_mapel as nama_mapel, sekolah.nama_sekolah as nama_sekolah FROM teacher INNER JOIN mapel_sekolah ON teacher.kd_mapel = mapel_sekolah.uid_mapel INNER JOIN sekolah ON teacher.kd_sekolah = sekolah.uid_sekolah ORDER BY nama_guru',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.success(
          {
            Error: false,
            Message: 'Data Berhasil didapatkan',
            data: {
              uuid_guru: rows.uuid_guru,
              nama_sekolah: rows.nama_sekolah,
              nama_mapel: rows.nama_mapel,
              nama_guru: rows.nama_guru,
              jabatan: rows.jabatan,
              jenis_kelamin: rows.jenis_kelamin,
              golongan: rows.golongan,
              pendidikan: rows.golongan,
              agama: rows.agama,
              tempat_lahir: rows.tempat_lahir,
              tgl_lahir: rows.tgl_lahir,
              alamat_guru: rows.alamat_guru,
              no_hp: rows.no_hp,
              email: rows.email,
              photo: rows.photo,
            },
          },
          res
        );
      }
    }
  );
};

exports.insertTeacher = function (req, res) {
  let nm_guru = req.body.nama_guru;
  let subs_nama = nm_guru.substring(0, 3);
  let data = {
    uid_guru: 'TC' + req.body.kd_sekolah + req.kd_mapel + subs_nama,
    kd_sekolah: req.body.kd_sekolah,
    kd_mapel: req.body.kd_mapel,
    nama_guru: nm_guru,
    jabatan: req.body.jabatan,
    jenis_kelamin: req.body.jenis_kelamin,
    golongan: req.body.golongan,
    pendidikan: req.body.pendidikan,
    agama: req.body.agama,
    tempat_lahir: req.body.tempat_lahir,
    tgl_lahir: req.body.tgl_lahir,
    alamat_guru: req.body.alamat_guru,
    no_hp: req.body.no_hp,
    email: req.body.email,
    photo_guru: req.file,
  };

  let queryInsert = 'INSERT INTO ?? SET ?';
  const tableTeacher = 'teacher';
  queryInsert = mysql.format(queryInsert, tableTeacher);

  dbexec.query(queryInsert, data, function (error, rows) {
    if (error) {
      console.error(error);
      res.send('Internal Server Error');
    } else {
      res.json(
        {
          Error: false,
          Message: 'Data Berhasil Disimpan',
          data: {
            uuid_guru: rows.uuid_guru,
            nama_guru: rows.nama_guru,
          },
        },
        res
      );
    }
  });
};

exports.getTeacherById = function (req, res) {
  let id_teacher = req.params.uid_guru;

  dbexec.query(
    'SELECT * FROM ?? INNER JOIN mapel_sekolah ON teacher.kd_mapel = mapel_sekolah.uid_mapel INNER JOIN sekolah ON teacher.kd_sekolah = sekolah.uid_sekolah WHERE ?? = ?',
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
            Data: rows,
          },
          res
        );
      }
    }
  );
};

exports.updateGuru = function (req, res) {
  let uuid_guru = req.body.uuid_guru;
  let data = {
    kd_sekolah: req.body.kd_sekolah,
    kd_mapel: req.body.kd_mapel,
    nama_guru: nm_guru,
    jabatan: req.body.jabatan,
    jenis_kelamin: req.body.jenis_kelamin,
    golongan: req.body.golongan,
    pendidikan: req.body.pendidikan,
    agama: req.body.agama,
    tempat_lahir: req.body.tempat_lahir,
    tgl_lahir: req.body.tgl_lahir,
    alamat_guru: req.body.alamat_guru,
    no_hp: req.body.no_hp,
    email: req.body.email,
    photo_guru: req.file,
  };
  dbexec.query('UPDATE ?? SET ??=? WHERE ??=?,', ['teacher', data, 'uuid_guru', uuid_guru], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.send('Invalid Server Error');
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: ' Data Berhasil di update',
        Data: rows,
      });
    }
  });
};

exports.deleteTeacher = function (req, res) {
  const uuid_guru = req.body.uuid_guru;

  dbexec.query('DELETE FROM ?? WHERE ??= ?', ['teacher', 'uuid_guru', uuid_guru], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.send('Invalid Server Error');
    } else {
      res.json({
        Error: false,
        Status: 'Success',
        Message: 'Data Berhasil Dihapus',
        Data: rows,
      });
    }
  });
};
