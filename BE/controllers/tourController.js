import { poolPromise, sql } from '../config/db.js';

export const createTour = async (req, res) => {
  try {
    const {
      PUCLIC_TOUR_NAME,
      address,
      DESCRIPIONS_HIGHLIGHT,
      PUCLIC_TOUR_TYPE,
      DESCRIPTIONS,
      START_DAY,
      END_DAY,
      ADULT_COUNT,
      INSTRUCTION_LANGUAGE,
      adultPrice,
      childPrice,
    } = req.body;

    if (
      !PUCLIC_TOUR_NAME ||
      !address ||
      !DESCRIPIONS_HIGHLIGHT ||
      !PUCLIC_TOUR_TYPE ||
      !DESCRIPTIONS ||
      !START_DAY ||
      !END_DAY ||
      !ADULT_COUNT ||
      !INSTRUCTION_LANGUAGE ||
      !adultPrice ||
      !childPrice
    ) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin tour.' });
    }

    const pool = await poolPromise;
    await pool
      .request()
      .input('PUCLIC_TOUR_NAME', sql.NVarChar, PUCLIC_TOUR_NAME)
      .input('PUCLIC_TOUR_TYPE', sql.NVarChar, PUCLIC_TOUR_TYPE)
      .input('address', sql.NVarChar, address)
      .input('DESCRIPIONS_HIGHLIGHT', sql.NVarChar, DESCRIPIONS_HIGHLIGHT)
      .input('DESCRIPTIONS', sql.NVarChar, DESCRIPTIONS)
      .input('START_DAY', sql.Date, START_DAY)
      .input('END_DAY', sql.Date, END_DAY)
      .input('ADULT_COUNT', sql.Int, ADULT_COUNT)
      .input('INSTRUCTION_LANGUAGE', sql.NVarChar, INSTRUCTION_LANGUAGE)
      .input('adultPrice', sql.Money, adultPrice)
      .input('childPrice', sql.Money, childPrice)
      .query(
        'INSERT INTO PUBLIC_TOUR (PUCLIC_TOUR_NAME, PUCLIC_TOUR_TYPE, address, DESCRIPIONS_HIGHLIGHT, DESCRIPTIONS, START_DAY, END_DAY, ADULT_COUNT, INSTRUCTION_LANGUAGE, adultPrice, childPrice) VALUES (@PUCLIC_TOUR_NAME, @PUCLIC_TOUR_TYPE, @address, @DESCRIPIONS_HIGHLIGHT, @DESCRIPTIONS, @START_DAY, @END_DAY, @ADULT_COUNT, @INSTRUCTION_LANGUAGE, @adultPrice, @childPrice)'
      );

    res.status(201).json({ message: 'Tour đã được tạo thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tour.', error: error.message });
  }
};
