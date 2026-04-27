const express = require('express');
const router = express.Router();

const bestRoomBookings = require('../functions/analytics/bestRoomBookings');
const bestRoomRevenue = require('../functions/analytics/bestRoomRevenue');
const topGuestPayment = require('../functions/analytics/topGuestPayment');
const topRevenueDate = require('../functions/analytics/topRevenueDate');
const topBookingDate = require('../functions/analytics/topBookingDate');
const getMembers = require('../functions/analytics/getMembers');
const getMembersCount = require('../functions/analytics/getMembersCount');

// helper response
const success = (res, data) => {
  return res.status(200).json({
    success: true,
    data,
  });
};

const error = (res, err) => {
  console.error(err);
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

// 🔹 Best Room Bookings
router.get('/best-room-bookings', async (req, res) => {
  try {
    const data = await bestRoomBookings();
    return success(res, data);
  } catch (err) {
    return error(res, err);
  }
});

// 🔹 Best Room Revenue
router.get('/best-room-revenue', async (req, res) => {
  try {
    const data = await bestRoomRevenue();
    return success(res, data);
  } catch (err) {
    return error(res, err);
  }
});

// 🔹 Top Guest Payment
router.get('/top-guest-payment', async (req, res) => {
  try {
    const data = await topGuestPayment();
    return success(res, data);
  } catch (err) {
    return error(res, err);
  }
});

// 🔹 Top Revenue Date
router.get('/top-revenue-date', async (req, res) => {
  try {
    const data = await topRevenueDate();
    return success(res, data);
  } catch (err) {
    return error(res, err);
  }
});

// Top Booking Date
router.get('/top-booking-date', async (req, res) => {
  const result = await topBookingDate();
  res.json(result);
});

// GET Members
router.get('/members', async (req, res) => {
  const result = await getMembers();
  res.json(result);
});

// GET Members Count
router.get('/members/count', async (req, res) => {
  const result = await getMembersCount();
  res.json(result);
});

module.exports = router;