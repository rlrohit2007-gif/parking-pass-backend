const transactionModel = require('../models/transactionModel');

console.log(transactionModel);

async function createTransaction(req, res) {
  try {
    const { uid, amount, date, time } = req.body;

    if (!uid || !amount || !date || !time) {
      return res.status(400).json({ error: 'uid, amount, date, and time are all required' });
    }

    const result = await transactionModel.createTransaction(uid, amount, date, time);

    res.status(201).json({
      message: 'Transaction created successfully',
      transactionId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while creating transaction' });
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionModel.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching transactions' });
  }
}

async function getTransactionsByUid(req, res) {
  try {
    const { uid } = req.params;
    const transactions = await transactionModel.getTransactionsByUid(uid);
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching transactions for this uid' });
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionsByUid
};
