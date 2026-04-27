const pool = require('../../config/db');

const bestRoomBookings = async () => {
  const result = await pool.query(`
    SELECT 
      r.room_number,
      COUNT(b.booking_id) AS total_bookings
    FROM bookings b
    JOIN rooms r ON b.room_id = r.room_id
    GROUP BY r.room_number
    ORDER BY total_bookings DESC
    LIMIT 1
  `);

  return result.rows;
};

module.exports = bestRoomBookings;