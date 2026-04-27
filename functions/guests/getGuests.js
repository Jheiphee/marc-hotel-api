const pool = require('../../config/db');

const getGuests = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        guest_id,
        profile_id,
        guest_type,
        is_member
      FROM guests
      ORDER BY guest_id ASC
    `);

    return {
      success: true,
      data: result.rows
    };

  } catch (err) {
    console.error('GET GUESTS ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getGuests;