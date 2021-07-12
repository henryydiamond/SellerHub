import express from 'express';
const router = express.Router();
import { authUser } from '../controlers/userControler.js';

router.post('/login', authUser);

export default router;
