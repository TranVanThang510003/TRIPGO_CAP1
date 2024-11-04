// controllers/restaurantController.js
import { poolPromise, sql } from '../config/db.js';

// Lấy danh sách tất cả các nhà hàng
export const getAllRestaurants = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM [RESTAURANT]');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết của một nhà hàng (có thể thêm chức năng này nếu cần)
export const getRestaurantDetails = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('restaurantId', sql.Int, restaurantId)
      .query('SELECT * FROM [RESTAURANT] WHERE RESTAURANT_ID = @restaurantId');
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
