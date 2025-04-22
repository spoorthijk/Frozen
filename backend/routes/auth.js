import express from 'express';
import { login, register, adminRegistration } from '../controller/authController.js';


const router = express.Router();
router.post('/admin-signup',adminRegistration)
router.post('/register',register)
router.post('/login',login)
export default router;