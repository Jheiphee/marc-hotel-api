const pool = require('../config/db');

// GET ALL
exports.getProfiles = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM public.profiles`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ONE
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM public.profiles WHERE profile_id = $1`,
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// CREATE
exports.createProfile = async (req, res) => {
  try {
    const {
      profile_id,
      first_name,
      last_name,
      date_of_birth,
      gender,
      marital_status,
      contact_number,
      profile_type
    } = req.body;

    await pool.query(`
      INSERT INTO public.profiles
      (profile_id, first_name, last_name, date_of_birth, gender, marital_status, contact_number, profile_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `, [profile_id, first_name, last_name, date_of_birth, gender, marital_status, contact_number, profile_type]);

    res.send("Profile created ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    await pool.query(`
      UPDATE public.profiles
      SET first_name = $1, last_name = $2
      WHERE profile_id = $3
    `, [first_name, last_name, id]);

    res.send("Profile updated ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM public.profiles WHERE profile_id = $1`,
      [id]
    );

    res.send("Profile deleted ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
};