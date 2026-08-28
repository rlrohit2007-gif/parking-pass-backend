const db = require("../config/db");


const getDashboard = async (req, res) => {

    try {

        const [students] = await db.query(
            "SELECT COUNT(*) AS total_students FROM students"
        );


        const [payments] = await db.query(
            "SELECT SUM(amount) AS total_collection FROM payments"
        );


        const [parking] = await db.query(
            "SELECT COUNT(*) AS total_parking FROM parking_logs"
        );


        res.json({

            dashboard: {
                total_students: students[0].total_students,
                total_collection: payments[0].total_collection || 0,
                total_parking: parking[0].total_parking
            }

        });


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Get all students
const getStudents = async (req, res) => {

    try {

        const [students] = await db.query(
            "SELECT * FROM students"
        );

        res.json(students);


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Add new student
const addStudent = async (req, res) => {

    try {

        const {
            uid,
            student_name,
            department,
            year,
            balance
        } = req.body;


        const [result] = await db.query(

            "INSERT INTO students (uid, student_name, department, year, balance) VALUES (?, ?, ?, ?, ?)",

            [
                uid,
                student_name,
                department,
                year,
                balance
            ]

        );


        res.json({

            message: "Student added successfully",
            id: result.insertId

        });


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Get Parking History
const getParkingHistory = async (req, res) => {

    try {

        const [parking] = await db.query(
            "SELECT * FROM parking_logs"
        );


        res.json(parking);


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Get Payment History
const getPaymentHistory = async (req, res) => {

    try {

        const [payments] = await db.query(
            "SELECT * FROM payments"
        );


        res.json(payments);


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};




// Delete Student
const deleteStudent = async (req, res) => {

    try {

        const uid = req.params.uid;


        await db.query(
            "DELETE FROM students WHERE uid=?",
            [uid]
        );


        res.json({

            message: "Student deleted successfully"

        });


    } catch(error) {

        res.status(500).json({

            error: error.message

        });

    }

};
const deleteParking = async (req, res) => {

    try {

        const id = req.params.id;


        await db.query(
            "DELETE FROM parking_logs WHERE id=?",
            [id]
        );


        res.json({
            message:"Parking history deleted successfully"
        });


    } catch(error) {

        res.status(500).json({
            error:error.message
        });

    }

};
const deletePayment = async (req, res) => {

    try {

        const id = req.params.id;


        await db.query(
            "DELETE FROM payments WHERE id=?",
            [id]
        );


        res.json({
            message:"Payment deleted successfully"
        });


    } catch(error) {

        res.status(500).json({
            error:error.message
        });

    }

};
module.exports = {

    getDashboard,
    getStudents,
    addStudent,
    getParkingHistory,
    getPaymentHistory,
    deleteStudent,
    deleteParking,
    deletePayment

};