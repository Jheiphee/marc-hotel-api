const express = require('express');
const router = express.Router();

const pool = require('../config/db');

const getRooms = require('../functions/rooms/getRooms');
const getRoomById = require('../functions/rooms/getRoomById');
const createRoom = require('../functions/rooms/createRoom');
const updateRoom = require('../functions/rooms/updateRoom');
const deleteRoom = require('../functions/rooms/deleteRoom');


// GET ALL
router.get('/', async (req, res) => {
  const result = await getRooms();
  res.json(result);
});

// GET BY ROOM BY ID
router.get('/:id', async (req, res) => {
  const result = await getRoomById(req.params.id);
  res.json(result);
});


// GET AVAILABLE ROOMS
router.get('/available', async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM rooms WHERE status = 'available'"
  );
  res.json(result.rows);
});

// CREATE ROOM
router.post('/', async (req, res) => {
  const result = await createRoom(req.body);
  res.json(result);
});

// UPDATE ROOM
router.put('/:id', async (req, res) => {
  const result = await updateRoom(req.params.id, req.body);
  res.json(result);
});

// DELETE ROOM
router.delete('/:id', async (req, res) => {
  const result = await deleteRoom(req.params.id);
  res.json(result);
});

module.exports = router;