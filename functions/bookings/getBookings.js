const pool = require('../../config/db');

const getBookings = async () => {
  const result = await pool.query(`
    SELECT * FROM bookings
    ORDER BY check_in_date DESC
  `);

  return result.rows;
};

module.exports = getBookings;