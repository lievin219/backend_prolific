import express from 'express'
import  { bookSession, getBookings, getAvailableSlots } from '../controllers/bookingcontrollers.js';
import protect from '../middlewares/authmiddleware.js';
const booking = express.Router();
booking.post('/', protect, bookSession);
booking.get('/', protect, getBookings);
booking.get('/available',protect, getAvailableSlots);
export default booking
