const express = require("express");
const router = express.Router();


const {
    getDashboard,
    getStudents,
    addStudent,
    getParkingHistory,
    getPaymentHistory,
    deleteStudent,
    deleteParking,
    deletePayment

} = require("../controllers/adminController");



router.get("/dashboard", getDashboard);


router.get("/students", getStudents);


router.post("/students", addStudent);


router.get("/parking", getParkingHistory);


router.get("/payments", getPaymentHistory);


// Delete Student
router.delete("/student/:uid", deleteStudent);


// Delete Parking History
router.delete("/parking/:id", deleteParking);
router.delete("/payment/:id", deletePayment);



module.exports = router;