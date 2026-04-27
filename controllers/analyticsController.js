const pool = require('../config/db');

/**
 * 🏆 TOP GUEST (HIGHEST PAYMENT)
 */
exports.getTopGuestPayment = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.guest_id,
        p.first_name,
        p.last_name,
        SUM(pay.amount) AS total_payment
      FROM public.payments pay
      JOIN public.guests g ON pay.guest_id = g.guest_id
      JOIN public.profiles p ON g.profile_id = p.profile_id
      GROUP BY g.guest_id, p.first_name, p.last_name
      ORDER BY total_payment DESC
      LIMIT 1
    `);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * 📅 TOP REVENUE DATE
 */
exports.getTopRevenueDate = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(payment_date) AS date,
        SUM(amount) AS total_revenue
      FROM public.payments
      GROUP BY DATE(payment_date)
      ORDER BY total_revenue DESC
      LIMIT 1
    `);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};