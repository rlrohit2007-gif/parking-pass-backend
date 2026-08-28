const pool = require("../config/db");

// Get all students
async function getAllStudents() {
  const [rows] = await pool.query(
    "SELECT * FROM students ORDER BY id ASC"
  );
  return rows;
}

// Get student by UID
async function getStudentByUid(uid) {
  const [rows] = await pool.query(
    "SELECT * FROM students WHERE uid = ?",
    [uid]
  );

  return rows[0];
}

module.exports = {
  getAllStudents,
  getStudentByUid
};