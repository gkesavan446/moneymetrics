import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getDashboardSummary, getMonthlySummary, getExpenseByCategory } from '../controllers/dashboardController.js'

const router = Router();

router.get('/summary', authMiddleware, getDashboardSummary)
router.get('/monthly', authMiddleware, getMonthlySummary)
router.get('/expensebycategory', authMiddleware, getExpenseByCategory)

export default router;