import express from 'express';
import { signupUser } from '../controlles/user.js';
import signupValidation from '../Midelwares/user.js';


const router = express.Router();

router.post('/signup', signupValidation, signupUser);

export default router;
