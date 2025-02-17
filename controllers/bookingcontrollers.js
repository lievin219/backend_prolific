import booking from "../routers/booking.js";
// import Stripe from "stripe"

import Booking from "../models/booking.js";



// const stripe=new Stripe(STRIPE_SECRET_KEY)
export const  bookSession = async (req, res) => {
  try {
    const { coachId, date, timeSlot } = req.body;
    const existingBooking = await Booking.findOne({ coach: coachId, date, timeSlot });
    if (existingBooking) return res.status(400).json({ message: 'Slot already booked' });
    
    const booking = await Booking.create({ user: req.user.id, coach: coachId, date, timeSlot });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { coachId, date } = req.query;
    const bookedSlots = await Booking.find({ coach: coachId, date }).select('timeSlot');
    const allSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
    const availableSlots = allSlots.filter(slot => !bookedSlots.some(b => b.timeSlot === slot));
    res.json(availableSlots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('coach', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const makePayments=async(req,res)=>{
//    const {products}=req.body
//    const lineItems=products.map((product)=>({
//     price_data:{
//        currency:'usd',
//        product_data:{
//          name:product.name,
//          images: product.image ? [product.image] : [],

//        },
//        unit_amount:Math.round(product.price*100),
//     },
//     quantity:product.quantity
//    }))

//     const session=await stripe.checkout.sessions.create({
//        payment_method_types:["card"],
//        line_items:lineItems,
//        mode:"payment",
//        success_url:"http://localhost:3000/#/Book",
//        cancel_url:"http://localhost:3000/#/Home"

//     })
//     res.json({id:session.id})
   
// }

