const classroomDao = require('./classroom-dao.js')

function initClassroom (app) {
  app.get('/classrooms/', (req, res, next) => {
    classroomDao.getClassrooms()
      .then((classrooms) => {
        res.send(classrooms)
      })
      .catch((err) => {
        next(err)
      })
  })

  app.get('/classrooms/teacher', (req, res, next) => {
    const userName = req.user.userName
    classroomDao.getClassroomByTeacher(userName)
      .then((classrooms) => {
        res.send(classrooms)
      })
      .catch((err) => {
        next(err)
      })
  })
}

module.exports = initClassroom
