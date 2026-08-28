const studentModel = require("../models/studentModel");

const db = require("../config/db");


// Get all students
async function getAllStudents(req, res) {

  try {

    const students = await studentModel.getAllStudents();

    res.status(200).json(students);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error while fetching students"
    });

  }

}


// Get student by UID
async function getStudentByUid(req, res) {

  try {

    const { uid } = req.params;

    const student = await studentModel.getStudentByUid(uid);

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    res.status(200).json(student);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error while fetching student"
    });

  }

}


// Student Login (RFID + Password)
async function studentLogin(req, res) {

  try {

    const { uid, password } = req.body;

    if (!uid || !password) {
      return res.status(400).json({
        error: "RFID UID and Password are required"
      });
    }

    const [student] = await db.query(
      "SELECT * FROM students WHERE uid=?",
      [uid]
    );

    if (student.length === 0) {

      return res.status(401).json({
        error: "Invalid RFID UID"
      });

    }

    // Password Check
    if (student[0].password !== password) {

      return res.status(401).json({
        error: "Invalid Password"
      });

    }

    // Password response-la anuppa vendam
    const { password: _, ...studentData } = student[0];

    res.json({

      message: "Student Login Successful",

      student: studentData

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

}


module.exports = {

  getAllStudents,
  getStudentByUid,
  studentLogin

};