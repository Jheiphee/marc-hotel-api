const express = require('express');
const router = express.Router();

const getGuests = require('../functions/guests/getGuests');
const getGuestById = require('../functions/guests/getGuestById');
const createGuest = require('../functions/guests/createGuest');
const updateGuest = require('../functions/guests/updateGuest');
const deleteGuest = require('../functions/guests/deleteGuest');

const pool = require('../config/db');

// GET ALL
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM guests');
  res.json(result.rows);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const data = await getGuestById(req.params.id);
  res.json(data);
});

// CREATE
router.post('/', async (req, res) => {
  const data = await createGuest(req.body);
  res.json(data);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const data = await updateGuest(req.params.id, req.body);
  res.json(data);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const data = await deleteGuest(req.params.id);
  res.json(data);
});

module.exports = router;