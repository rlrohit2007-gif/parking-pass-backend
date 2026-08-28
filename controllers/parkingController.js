const db = require("../config/db");

// =======================
// Student Entry
// =======================
const entryParking = async (req, res) => {

    const { uid } = req.body;

    try {

        // Check already parked
        const [existing] = await db.query(
            "SELECT * FROM parking_logs WHERE uid=? AND status='PARKED'",
            [uid]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Vehicle already inside parking"
            });
        }

        await db.query(
            "INSERT INTO parking_logs(uid, status) VALUES(?, ?)",
            [uid, "PARKED"]
        );

        res.json({
            message: "Vehicle Entry Successful",
            uid
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// =======================
// Student Exit
// =======================
const exitParking = async (req, res) => {

    const { uid } = req.params;

    try {

        const [logs] = await db.query(
            "SELECT * FROM parking_logs WHERE uid=? AND status='PARKED'",
            [uid]
        );

        if (logs.length === 0) {
            return res.status(404).json({
                message: "No Active Parking Found"
            });
        }

        const parking = logs[0];

        const entryTime = new Date(parking.entry_time);
        const exitTime = new Date();

        const diffMs = exitTime - entryTime;

        // ===========================
        // DEMO MODE
        // 1 Minute = 1 Hour
        // ===========================
        const hours = Math.max(
            1,
            Math.ceil(diffMs / (1000 * 10))
        );

        let amount = 30;

        if (hours > 8) {
            amount += (hours - 8) * 5;
        }

        console.log("========== PARKING ==========");
        console.log("Entry :", entryTime);
        console.log("Exit  :", exitTime);
        console.log("Hours :", hours);
        console.log("Fee   :", amount);
        console.log("=============================");

        const [student] = await db.query(
            "SELECT balance FROM students WHERE uid=?",
            [uid]
        );

        if (student.length === 0) {
            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        const balance = Number(student[0].balance);

        if (balance < amount) {
            return res.status(400).json({
                message: "Insufficient Balance",
                parking_fee: amount,
                balance
            });
        }

        const newBalance = balance - amount;

        await db.query(
            "UPDATE students SET balance=? WHERE uid=?",
            [newBalance, uid]
        );

        await db.query(
            "INSERT INTO payments(uid, amount, type) VALUES(?,?,?)",
            [uid, amount, "PARKING"]
        );

        await db.query(
            `UPDATE parking_logs
             SET exit_time=CURRENT_TIMESTAMP,
                 status='EXITED'
             WHERE id=?`,
            [parking.id]
        );

        res.json({
            message: "Vehicle Exit Successful",
            parking_hours: hours,
            parking_fee: amount,
            remaining_balance: newBalance
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// =======================
// Get Parking Logs
// =======================
const getParkingLogs = async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM parking_logs ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    entryParking,
    exitParking,
    getParkingLogs
};