import express, { Router } from 'express';
import { register, login, getMe, logout, forgotPassword, resetPassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);


export default router;