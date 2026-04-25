const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * 🔥 DATABASE CONNECTION
 */
const pool = new Pool({
  user: 'postgres',
  host: 'marc-db.c3awo28o84db.ap-southeast-2.rds.amazonaws.com',
  database: 'hotel_db',
  password: 'admin1234',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * 🧪 TEST ROUTE
 */
app.get('/', (req, res) => {
  res.send("Marc Hotel API is running 🚀");
});

/**
 * 🧩 EMPLOYMENT
 */
app.get('/employment', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM public.employment_details`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/employment/search', async (req, res) => {
  const { search } = req.query;

  if (!search) return res.status(400).send('Search query is required');

  try {
    const result = await pool.query(`
      SELECT e.*, p.first_name, p.last_name
      FROM public.employment_details e
      JOIN public.profiles p ON e.profile_id = p.profile_id
      WHERE e.employee_id ILIKE $1
         OR p.first_name ILIKE $1
         OR p.last_name ILIKE $1
    `, [`%${search}%`]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * 🧩 GUESTS
 */
app.get('/guests', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM public.guests`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/guests/search', async (req, res) => {
  const { search } = req.query;

  if (!search) return res.status(400).send('Search query is required');

  try {
    const result = await pool.query(`
      SELECT g.*, p.first_name, p.last_name
      FROM public.guests g
      JOIN public.profiles p ON g.profile_id = p.profile_id
      WHERE g.guest_id ILIKE $1
         OR p.first_name ILIKE $1
         OR p.last_name ILIKE $1
    `, [`%${search}%`]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * 🧩 PROFILES
 */
app.get('/profiles', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM public.profiles`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * 🎟️ MEMBERS (GUESTS ONLY)
 */
app.get('/members', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.guest_id,
        p.first_name,
        p.last_name,
        g.is_member
      FROM public.guests g
      JOIN public.profiles p 
        ON g.profile_id = p.profile_id
      WHERE g.is_member IS TRUE
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get('/members/count', async (req, res) => {
  try {
    const members = await pool.query(`
      SELECT 
        g.guest_id,
        p.first_name,
        p.last_name
      FROM public.guests g
      JOIN public.profiles p 
        ON g.profile_id = p.profile_id
      WHERE g.is_member IS TRUE
    `);

    res.json({
      total_members: members.rows.length,
      members: members.rows
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * 🔥 ANALYTICS
 */

// 🏆 Best Room (Bookings)
app.get('/analytics/best-room-bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.room_number,
        COUNT(b.booking_id) AS total_bookings
      FROM public.bookings b
      JOIN public.rooms r ON b.room_id = r.room_id
      GROUP BY r.room_number
      ORDER BY total_bookings DESC
      LIMIT 1
    `);

    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 💰 Best Room (Revenue)
app.get('/analytics/best-room-revenue', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.room_number,
        SUM(pay.payment_amount) AS total_revenue
      FROM public.payments pay
      JOIN public.bookings b ON pay.booking_id = b.booking_id
      JOIN public.rooms r ON b.room_id = r.room_id
      GROUP BY r.room_number
      ORDER BY total_revenue DESC
      LIMIT 1
    `);

    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 👤 Top Guest Payment
app.get('/analytics/top-guest-payment', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.guest_id,
        SUM(pay.payment_amount) AS total_payment
      FROM public.guests g
      JOIN public.bookings b ON g.guest_id = b.guest_id
      JOIN public.payments pay ON b.booking_id = pay.booking_id
      GROUP BY g.guest_id
      ORDER BY total_payment DESC
      LIMIT 1
    `);

    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 📅 Top Revenue Date
app.get('/analytics/top-revenue-date', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        payment_date,
        SUM(payment_amount) AS total_revenue
      FROM public.payments
      GROUP BY payment_date
      ORDER BY total_revenue DESC
      LIMIT 1
    `);

    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 📅 Top Booking Date
app.get('/analytics/top-booking-date', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        check_in_date AS booking_date,
        COUNT(*) AS total_bookings
      FROM public.bookings
      GROUP BY check_in_date
      ORDER BY total_bookings DESC
      LIMIT 1
    `);

    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
 * 🚀 START SERVER
 */
const serverless = require('serverless-http');

module.exports.handler = serverless(app);