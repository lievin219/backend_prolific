 import express from 'express'
 import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: Date,
    timeSlot: String,
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  });
  const Booking = mongoose.model('Booking', BookingSchema);
   export default Booking

