const pool = require('../../config/db');

const getBookingById = async (booking_id) => {
  const result = await pool.query(
    'SELECT * FROM bookings WHERE booking_id = $1',
    [booking_id]
  );

  if (result.rows.length === 0) {
    throw new Error('Booking not found');
  }

  return result.rows[0];
};

module.exports = getBookingById;