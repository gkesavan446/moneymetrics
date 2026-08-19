import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getReportSummary } from '../controllers/reportController.js';

const router = Router();

router.get('/', authMiddleware, getReportSummary);

export default router;