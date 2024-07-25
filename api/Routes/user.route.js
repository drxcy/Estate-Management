import express from 'express';
import { sign } from '../Controllers/users.controller.js';
const router = express.Router();

// Import routes
router.get('/signin',sign);
export default router;