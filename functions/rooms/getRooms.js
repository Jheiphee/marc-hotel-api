const pool = require('../../config/db');

const getRooms = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM rooms
      ORDER BY room_id ASC
    `);

    return {
      success: true,
      data: result.rows
    };

  } catch (err) {
    console.error('GET ROOMS ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getRooms;