const dbManager = require('../db-helper')

const buildQuery = (key, value) => {
  return {key: value}
}

const getClassroomByProp = (query) => {
  return new Promise((fulfill, reject) => {
    dbManager.connect().then((db) => {
      db.collection('classrooms')
        .find(query)
        .toArray((err, classrooms) => {
          if (err) return reject(err)
          else fulfill(classrooms)
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

const getClassrooms =  () => {
  return getClassroomByProp({},{})
}

module.exports = {
  getClassrooms,
  getClassroomByTeacher,
  getClassroomByStudent
}
