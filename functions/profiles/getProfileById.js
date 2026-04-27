const pool = require('../../config/db');

const getProfileById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM profiles WHERE profile_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Profile not found'
      };
    }

    return {
      success: true,
      data: result.rows[0]
    };

  } catch (err) {
    console.error('GET PROFILE BY ID ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getProfileById;