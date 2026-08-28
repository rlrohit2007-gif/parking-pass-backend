const pool = require('../config/db');

async function createTransaction(uid, amount, date, time) {
  console.log("NEW QUERY EXECUTING");

  const entryTime = `${date} ${time}`;

  const [result] = await pool.query(
    `INSERT INTO transactions
    (uid, amount, payment_status, entry_time, exit_time)
    VALUES (?, ?, ?, ?, ?)`,
    [
      uid,
      amount,
      "pending",
      entryTime,
      entryTime
    ]
  );

  return result;
}

async function getAllTransactions() {
  const [rows] = await pool.query(
    "SELECT * FROM transactions ORDER BY id DESC"
  );
  return rows;
}

async function getTransactionsByUid(uid) {
  const [rows] = await pool.query(
    "SELECT * FROM transactions WHERE uid = ? ORDER BY id DESC",
    [uid]
  );
  return rows;
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionsByUid
};