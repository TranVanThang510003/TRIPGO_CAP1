import express from 'express';
import { createTour } from '../../controllers/tourController.js';
import { verifyStaffRole } from '../../../middlewares/authMiddleware.js';

const router = express.Router();
// Route tạo mới một tour chỉ cho phép nhân viên (staff) thực hiện
router.post('/', verifyStaffRole, createTour);

export default router;
