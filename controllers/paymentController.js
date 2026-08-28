const db = require("../config/db");

// Create Payment (Parking Fee Deduct)
const createTransaction = async (req, res) => {

    const { uid, amount } = req.body;

    console.log("Parking Payment API Called:", req.body);

    try {

        const [student] = await db.query(
            "SELECT balance FROM students WHERE uid=?",
            [uid]
        );

        if (student.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        let balance = Number(student[0].balance);

        if (balance < Number(amount)) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        let newBalance = balance - Number(amount);

        await db.query(
            "UPDATE students SET balance=? WHERE uid=?",
            [newBalance, uid]
        );

        await db.query(
            "INSERT INTO payments(uid, amount, type) VALUES (?, ?, ?)",
            [uid, amount, "PARKING"]
        );

        res.json({
            message: "Payment successful",
            uid,
            paid_amount: amount,
            remaining_balance: newBalance
        });

    } catch (error) {

        console.error("Parking Error:", error);

        res.status(500).json({
            error: error.message
        });

    }

};


// Student Wallet Top Up
const topUpBalance = async (req, res) => {

    console.log("TopUp API Called:", req.body);

    const { uid, amount } = req.body;

    try {

        if (!uid || !amount || Number(amount) <= 0) {
            return res.status(400).json({
                error: "Invalid Top Up Amount"
            });
        }

        const [student] = await db.query(
            "SELECT balance FROM students WHERE uid=?",
            [uid]
        );

        if (student.length === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        const currentBalance = Number(student[0].balance);
        const newBalance = currentBalance + Number(amount);

        await db.query(
            "UPDATE students SET balance=? WHERE uid=?",
            [newBalance, uid]
        );

        await db.query(
            "INSERT INTO payments(uid, amount, type) VALUES (?, ?, ?)",
            [uid, amount, "TOPUP"]
        );

        res.json({
            message: "Top Up Successful",
            uid,
            added_amount: Number(amount),
            balance: newBalance
        });

    } catch (error) {

        console.error("TopUp Error:", error);

        res.status(500).json({
            error: error.message
        });

    }

};


// Get All Transactions
const getAllTransactions = async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM payments"
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// Get Transaction By UID
const getTransactionsByUid = async (req, res) => {

    const { uid } = req.params;

    try {

        const [rows] = await db.query(
            "SELECT * FROM payments WHERE uid=?",
            [uid]
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    createTransaction,
    topUpBalance,
    getAllTransactions,
    getTransactionsByUid
};