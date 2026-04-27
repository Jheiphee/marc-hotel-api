const pool = require('../../config/db');

const getRoomById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM rooms WHERE room_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Room not found'
      };
    }

    return {
      success: true,
      data: result.rows[0]
    };

  } catch (err) {
    console.error('GET ROOM BY ID ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getRoomById;