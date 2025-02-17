import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Stripe from 'stripe'

import cookieParser from 'cookie-parser'
import booking from '../routers/booking.js'

import  auth from '../routers/auth.js'
dotenv.config()

const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY

const stripe=new Stripe(STRIPE_SECRET_KEY)

console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
const app = express();


app.use(express.json());
app.use(cors({
     origin: 'http://localhost:3000',  // This allows requests only from your frontend domain
     methods: ['GET', 'POST'],         // You can specify allowed methods
     credentials: true,                // Allow cookies to be sent with requests (if needed)
   }));
app.use(cookieParser());

mongoose.connect('mongodb+srv://gakizalievin219:CeIh29b53hhQyT7O@cluster0.4oc1l.mongodb.net/').then(()=>{
     console.log('database is connected succesfully!!')
}).catch((err)=>{
     console.log(`database is not connected due to ${err}`)
})

app.use('/api/auth', auth);
app.use('/api/bookings', booking);
app.post("/create-checkout-session",async(req,res)=>{
     try {
          // Assuming you're sending the products data from frontend to backend
          const { products } = req.body;
      
          // Prepare line items for Stripe
          const lineItems = products.map((product) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                images: product.image ? [product.image] : [],
              },
              unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
            },
            quantity: product.quantity,
          }));
      
          // Create Stripe checkout session
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",  // Update this with your success page
            cancel_url: "http://localhost:3000/cancel", 
            // 
            //    // Update this with your cancel page

            
          });
      
          // Send the session ID back to frontend
          res.json({ id: session.id });
        } catch (error) {
          console.error("Error creating checkout session:", error);
          res.status(500).json({ error: "Internal server error" });
        }
   }
   
   )
   app.post("/create-checkout-session2",async(req,res)=>{
     try {
          // Assuming you're sending the products data from frontend to backend
          const { products } = req.body;
      
          // Prepare line items for Stripe
          const lineItems = products.map((product) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                images: product.image ? [product.image] : [],
              },
              unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
            },
            quantity: product.quantity,
          }));
      
          // Create Stripe checkout session
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",  // Update this with your success page
            cancel_url: "http://localhost:3000/cancel", 
            // 
            //    // Update this with your cancel page

            
          });
      
          // Send the session ID back to frontend
          res.json({ id: session.id });
        } catch (error) {
          console.error("Error creating checkout session:", error);
          res.status(500).json({ error: "Internal server error" });
        }
   }
   
   )
   app.post("/create-checkout-session3",async(req,res)=>{
     try {
          // Assuming you're sending the products data from frontend to backend
          const { products } = req.body;
      
          // Prepare line items for Stripe
          const lineItems = products.map((product) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                images: product.image ? [product.image] : [],
              },
              unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
            },
            quantity: product.quantity,
          }));
      
          // Create Stripe checkout session
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",  // Update this with your success page
            cancel_url: "http://localhost:3000/cancel", 
            // 
            //    // Update this with your cancel page

            
          });
      
          // Send the session ID back to frontend
          res.json({ id: session.id });
        } catch (error) {
          console.error("Error creating checkout session:", error);
          res.status(500).json({ error: "Internal server error" });
        }
   }
   
   )
// app.use('/api/payments', stripeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
