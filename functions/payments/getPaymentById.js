const pool = require('../../config/db');

const getPaymentById = async (id) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        payment_id,
        booking_id,
        payment_date,
        payment_type,
        payment_method,
        payment_amount,
        total_discount,
        status
      FROM payments
      WHERE payment_id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Payment not found'
      };
    }

    return {
      success: true,
      data: result.rows[0]
    };

  } catch (err) {
    console.error('GET PAYMENT BY ID ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = getPaymentById;