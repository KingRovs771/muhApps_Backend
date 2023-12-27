const { config } = require('../config/server');
const multer = require('multer');
module.exports = function (app) {
  const main = require('../controller/mainController');
  const teacher = require('../controller/teacherController');
  const school = require('../controller/schoolController');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const uploadImg = multer({ storage: storage });

  app.route('/').get(main.indexPage);

  //teacher route
  app.route('/teacher/getAll').get(teacher.getAllTeacher);
  app.route('/teacher/insertTeacher', uploadImg.single('file')).post(teacher.insertTeacher);
  app.route('/teacher/getTeacher/:uuid_guru').get(teacher.getTeacherById);
  app.route('/teacher/updateTeacher', uploadImg.single('file')).put(teacher.updateGuru);
  app.route('/teacher/deleteTeacher/:uuid_guru').delete(teacher.deleteTeacher);

  //school route
  app.route('/school/getAllSchool').get(school.getAllSchool);
  app.route('/school/getSchoolById/:uuid_school').get(school.getSchoolById);
  app.route('/school/insertSchool').post(school.insertSchool);
  app.route('/school/updateSchool').put(school.updateSchool);
  app.route('/school/deleteSchool/:uuid_school').delete(school.deleteSchool);
};
