const pool = require('../config/db');

// GET ALL
exports.getGuests = async (req, res) => {
  const result = await pool.query(`SELECT * FROM public.guests`);
  res.json(result.rows);
};

// CREATE
exports.createGuest = async (req, res) => {
  const { guest_id, profile_id, guest_type, is_member } = req.body;

  await pool.query(`
    INSERT INTO public.guests (guest_id, profile_id, guest_type, is_member)
    VALUES ($1,$2,$3,$4)
  `, [guest_id, profile_id, guest_type, is_member]);

  res.send("Guest created ✅");
};