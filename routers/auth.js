import express from 'express'
import { login,register,verifyEmail,logout } from '../controllers/authcontrollers.js';



const auth = express.Router();
auth.post('/register', register);
auth.get('/verify/:token', verifyEmail);
auth.post('/login', login);
auth.post('/logout', logout);
// auth.post('/',makePayments)
export default auth
