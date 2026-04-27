const express = require('express');
const router = express.Router();

const getPaymentById = require('../functions/payments/getPaymentById');
const createPayment = require('../functions/payments/createPayment');
const updatePayment = require('../functions/payments/updatePayment');
const deletePayment = require('../functions/payments/deletePayment');

const pool = require('../config/db');

// GET ALL
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM payments');
  res.json(result.rows);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const data = await getPaymentById(req.params.id);
  res.json(data);
});

// Create
router.post('/', async (req, res) => {
  const data = await createPayment(req.body);
  res.json(data);
});

// Update
router.put('/:id', async (req, res) => {
  const data = await updatePayment(req.params.id, req.body);
  res.json(data);
});

// Delete
router.delete('/:id', async (req, res) => {
  const result = await deletePayment(req.params.id);
  res.json(result);
});

module.exports = router;