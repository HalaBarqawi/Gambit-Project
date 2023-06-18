import express from 'express';
const router = express.Router();
import { Login, Signup } from '../controllers/customer';

router.post('/login', Login);
router.post('/signup', Signup);



export { router };
