const pool = require('../../config/db');

const getProfiles = async () => {
  try {
    const result = await pool.query(`
      SELECT * FROM profiles
      ORDER BY profile_id ASC
    `);

    return {
      success: true,
      data: result.rows
    };

  } catch (err) {
    console.error('GET PROFILES ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getProfiles;