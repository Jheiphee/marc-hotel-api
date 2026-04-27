const pool = require('../../config/db');

const topBookingDate = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(check_in_date) AS date,
        COUNT(*) AS total_bookings
      FROM bookings
      GROUP BY DATE(check_in_date)
      ORDER BY total_bookings DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'No booking data found'
      };
    }

    return {
      success: true,
      data: result.rows[0]
    };

  } catch (err) {
    console.error('TOP BOOKING DATE ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = topBookingDate;