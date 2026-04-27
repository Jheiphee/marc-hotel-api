const pool = require('../../config/db');

const updateBooking = async (booking_id, data) => {
  const {
    number_of_guests,
    check_in_date,
    check_out_date,
    status
  } = data;

  const result = await pool.query(
    `UPDATE bookings
     SET number_of_guests = $1,
         check_in_date = $2,
         check_out_date = $3,
         status = $4
     WHERE booking_id = $5
     RETURNING *`,
    [number_of_guests, check_in_date, check_out_date, status, booking_id]
  );

  if (result.rows.length === 0) {
    throw new Error('Booking not found');
  }

  return result.rows[0];
};

module.exports = updateBooking;