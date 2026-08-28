const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");


// Get all students
router.get("/", studentController.getAllStudents);


// Student RFID Login
router.post("/login", studentController.studentLogin);


// Get student by UID
router.get("/:uid", studentController.getStudentByUid);



module.exports = router;