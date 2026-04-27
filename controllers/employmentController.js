const pool = require('../config/db');

// GET ALL
exports.getEmployment = async (req, res) => {
  const result = await pool.query(`SELECT * FROM public.employment_details`);
  res.json(result.rows);
};

// SEARCH
exports.searchEmployment = async (req, res) => {
  const { search } = req.query;

  const result = await pool.query(`
    SELECT e.*, p.first_name, p.last_name
    FROM public.employment_details e
    JOIN public.profiles p ON e.profile_id = p.profile_id
    WHERE e.employee_id ILIKE $1
       OR p.first_name ILIKE $1
       OR p.last_name ILIKE $1
  `, [`%${search}%`]);

  res.json(result.rows);
};