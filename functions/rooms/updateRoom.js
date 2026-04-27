const pool = require('../../config/db');

const updateRoom = async (id, data) => {
  try {
    const {
      room_number,
      room_size,
      room_capacity,
      price_per_night,
      status,
      room_description
    } = data;

    // 🔹 check if room exists
    const check = await pool.query(
      `SELECT * FROM rooms WHERE room_id = $1`,
      [id]
    );

    if (check.rows.length === 0) {
      return {
        success: false,
        message: 'Room not found'
      };
    }

    // 🔹 optional: check if new room_number already exists (avoid duplicates)
    if (room_number) {
      const duplicateCheck = await pool.query(
        `SELECT 1 FROM rooms WHERE room_number = $1 AND room_id != $2`,
        [room_number, id]
      );

      if (duplicateCheck.rows.length > 0) {
        return {
          success: false,
          message: 'Room number already exists'
        };
      }
    }

    // 🔹 update (COALESCE keeps old value if null)
    const result = await pool.query(
      `
      UPDATE rooms
      SET
        room_number = COALESCE($1, room_number),
        room_size = COALESCE($2, room_size),
        room_capacity = COALESCE($3, room_capacity),
        price_per_night = COALESCE($4, price_per_night),
        status = COALESCE($5, status),
        room_description = COALESCE($6, room_description)
      WHERE room_id = $7
      RETURNING *
      `,
      [
        room_number ?? null,
        room_size ?? null,
        room_capacity ?? null,
        price_per_night ?? null,
        status ?? null,
        room_description ?? null,
        id
      ]
    );

    return {
      success: true,
      data: result.rows[0]
    };

  } catch (err) {
    console.error('UPDATE ROOM ERROR:', err);

    return {
      success: false,
      message: err.message
    };
  }
};

module.exports = updateRoom;