const pool = require('../../config/db');

const getEmployment = async () => {
  const result = await pool.query(`
    SELECT 
      employee_id,
      profile_id,
      job_title,
      position_level,
      status,
      shift
    FROM employment_details
    ORDER BY employee_id ASC
  `);

  return {
    success: true,
    data: result.rows
  };
};

module.exports = getEmployment;