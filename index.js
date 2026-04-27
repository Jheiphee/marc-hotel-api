require('dotenv').config();
const pool = require('./config/db');

const express = require('express');
const app = express();

// middleware
app.use(express.json());

// routes
const profilesRoutes = require('./routes/profiles');
const guestsRoutes = require('./routes/guests');
const employmentRoutes = require('./routes/employment');
const analyticsRoutes = require('./routes/analytics');
const bookingsRoutes = require('./routes/bookings');
const roomsRoutes = require('./routes/rooms');
const paymentsRoutes = require('./routes/payments');

app.use('/profiles', profilesRoutes);
app.use('/guests', guestsRoutes);
app.use('/employment', employmentRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/rooms', roomsRoutes);
app.use('/payments', paymentsRoutes);

// test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      time: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});