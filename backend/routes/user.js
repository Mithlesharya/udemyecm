import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';


const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.get('/api/logout', logoutUser);


export default router;