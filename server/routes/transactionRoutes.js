import express, { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { createTransaction, getTransactions } from '../controllers/transactionController.js'

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;