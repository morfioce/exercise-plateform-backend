const dbManager = require('../db-helper')

const buildQuery = (key, value) => {
  return {key: value}
}

const getClassroomByProp = (query) => {
  return new Promise((fulfill, reject) => {
    dbManager.connect().then((dbRef) => {
      const {dbHandler, db} = dbRef
      db.collection('classrooms')
        .find(query)
        .toArray((err, classrooms) => {
          if (err) return reject(err)
          else fulfill(classrooms)
          dbHandler.close()
        })
    })
    .catch((err) => {
      reject(err)
    })
  })
}
const getClassroomByTeacher = (teacherEmail) => {
  const query = {teachers: teacherEmail}
  return getClassroomByProp(query)
}

const getClassroomByStudent = (studentEmail) => {
  const query = {students: studentEmail}
  return getClassroomByProp(studentUserName)
}

module.exports = {
  getClassroomByTeacher,
  getClassroomByStudent
}
