const express = require('express');
const router = express.Router();

const createBooking = require('../functions/bookings/createBooking');
const getBookings = require('../functions/bookings/getBookings');
const getBookingById = require('../functions/bookings/getBookingById');
const updateBooking = require('../functions/bookings/updateBooking');
const deleteBooking = require('../functions/bookings/deleteBooking');

// GET ALL
router.get('/', async (req, res) => {
  const data = await getBookings();
  res.json(data);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const data = await getBookingById(req.params.id);
  res.json(data);
});

// CREATE
router.post('/', async (req, res) => {
  try {
    console.log("Incoming booking:", req.body); // 👈 ADD

    const data = await createBooking(req.body);

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err); // 👈 ADD

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const data = await updateBooking(req.params.id, req.body);
  res.json(data);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const data = await deleteBooking(req.params.id);
  res.json(data);
});

module.exports = router;