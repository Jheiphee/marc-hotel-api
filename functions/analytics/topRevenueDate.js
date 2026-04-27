const pool = require('../../config/db');

const topRevenueDate = async () => {
  const result = await pool.query(`
    SELECT 
      DATE(payment_date) AS date,
      SUM(payment_amount) AS total_revenue
    FROM payments
    GROUP BY DATE(payment_date)
    ORDER BY total_revenue DESC
    LIMIT 1
  `);

  return result.rows;
};

module.exports = topRevenueDate;