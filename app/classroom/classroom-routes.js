const classroomDao = require('./classroom-dao.js')

function initClassroom (app) {
  app.get('/classrooms/:email', (req, res, next) => {
    const email = req.params.email
    classroomDao.getClassroomByTeacher(email)
      .then((classrooms) => {
        res.send(classrooms)
      })
      .catch((err) => {
        next(err)
      })
  })
}

module.exports = initClassroom
