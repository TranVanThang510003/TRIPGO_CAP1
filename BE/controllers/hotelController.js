// controllers/hotelController.js
import { poolPromise, sql } from '../config/db.js';

// Lấy danh sách tất cả các khách sạn
export const getAllHotels = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM [HOTEL]');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết của một khách sạn
export const getHotelDetails = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('hotelId', sql.Int, hotelId)
      .query('SELECT * FROM [HOTEL] WHERE HOTEL_ID = @hotelId');
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
