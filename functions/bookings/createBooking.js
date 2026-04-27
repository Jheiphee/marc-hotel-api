const pool = require('../../config/db');

const createBooking = async (data) => {
  const {
    guest_id,
    room_id,
    employee_id, // ✅ already correct
    number_of_guests,
    check_in_date,
    check_out_date,
    status
  } = data;

  // 🔹 check room exists
  const roomCheck = await pool.query(
    'SELECT 1 FROM rooms WHERE room_id = $1',
    [room_id]
  );

  if (roomCheck.rows.length === 0) {
    throw new Error('Room does not exist');
  }

  // 🔹 check overlapping booking
  const overlapCheck = await pool.query(
    `SELECT 1 FROM bookings
     WHERE room_id = $1
     AND status IN ('confirmed', 'checked_in')
     AND (
       (check_in_date <= $2 AND check_out_date >= $2)
       OR
       (check_in_date <= $3 AND check_out_date >= $3)
     )`,
    [room_id, check_in_date, check_out_date]
  );

  if (overlapCheck.rows.length > 0) {
    throw new Error('Room already booked for selected dates');
  }

  // 🔥 FIXED INSERT
  const result = await pool.query(
    `INSERT INTO bookings 
    (booking_id, guest_id, room_id, number_of_guests, check_in_date, check_out_date, status, employee_id)
    VALUES (
      CONCAT('BOOKINGID-', FLOOR(RANDOM() * 10000)),
      $1, $2, $3, $4, $5, $6, $7
    )
    RETURNING *`,
    [
      guest_id,
      room_id,
      number_of_guests,
      check_in_date,
      check_out_date,
      status,
      employee_id // ✅ ADD THIS
    ]
  );

  return result.rows[0];
};

module.exports = createBooking;