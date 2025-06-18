// import express from 'express'
// import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import { register } from '../controllers/authcontrollers.js'
// import Stripe from 'stripe'
// import nodemailer from 'nodemailer'
// import cookieParser from 'cookie-parser'
// import booking from '../routers/booking.js'

// import  auth from '../routers/auth.js'
// dotenv.config()

// const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY

// const stripe=new Stripe(STRIPE_SECRET_KEY)

// console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
// const app = express();


// app.use(express.json());
// app.use(cors({
//      origin: 'http://localhost:3000',  // This allows requests only from your frontend domain
//      methods: ['GET', 'POST'],         // You can specify allowed methods
//      credentials: true,                // Allow cookies to be sent with requests (if needed)
//    }));
// app.use(cookieParser());

// mongoose.connect('mongodb+srv://gakizalievin219:CeIh29b53hhQyT7O@cluster0.4oc1l.mongodb.net/').then(()=>{
//      console.log('database is connected succesfully!!')
// }).catch((err)=>{
//      console.log(`database is not connected due to ${err}`)
// })

// app.use("/api/auth", auth);

// app.use("/", booking);
// async function handleStripeSession(req, res, success_url, cancel_url) {
//   try {
//     const { products } = req.body;

//     const lineItems = products.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//           images: product.image ? [product.image] : [],
//         },
//         unit_amount: Math.round(product.price * 100),
//       },
//       quantity: product.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url,
//       cancel_url,
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// app.post("/create-checkout-session-gold1", async (req, res) => {
//   console.log("Body received:", req.body); // Add this
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });  

// app.post("/create-checkout-session-gold2", async (req, res) => {
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });

// app.post("/create-checkout-session-silver1", async (req, res) => {
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });

// app.post("/create-checkout-session-silver2", async (req, res) => {
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });

// app.post("/create-checkout-session-silver3", async (req, res) => {
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });

// app.post("/create-checkout-session-extension", async (req, res) => {
//   await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
// });

// app.post("/create-checkout-session",async(req,res)=>{
//      try {
//           // Assuming you're sending the products data from frontend to backend
//           const { products } = req.body;
      
//           // Prepare line items for Stripe
//           const lineItems = products.map((product) => ({
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: product.name,
//                 images: product.image ? [product.image] : [],
//               },
//               unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
//             },
//             quantity: product.quantity,
//           }));
      
//           // Create Stripe checkout session
//           const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/success",  // Update this with your success page
//             cancel_url: "http://localhost:3000/cancel", 
//             // 
//             //    // Update this with your cancel page

            
//           });
      
//           // Send the session ID back to frontend
//           res.json({ id: session.id });
//         } catch (error) {
//           console.error("Error creating checkout session:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//    }
   
//    )
//    app.post("/create-checkout-session2",async(req,res)=>{
//      try {
//           // Assuming you're sending the products data from frontend to backend
//           const { products } = req.body;
      
//           // Prepare line items for Stripe
//           const lineItems = products.map((product) => ({
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: product.name,
//                 images: product.image ? [product.image] : [],
//               },
//               unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
//             },
//             quantity: product.quantity,
//           }));
      
//           // Create Stripe checkout session
//           const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/Success",  
//             cancel_url: "http://localhost:3000/Support", 
           
     

            
//           });
      
//           res.json({ id: session.id });
//         } catch (error) {
//           console.error("Error creating checkout session:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//    }
   
//    )

//    app.post("/api/contact", (req, res) => {
//     const { name, email, message } = req.body;
  
//     // Create a Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // You can use other services like SendGrid
//       auth: {
//         user: process.env.EMAIL_USER, // Replace with your email
//         pass: process.env.EMAIL_PASS, // Replace with your email password
//       },
//     });
  
//     // Compose the email
//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER, // Replace with your email
//       subject: `New Contact Form Submission from ${name}`,
//       text: `You received a message from ${name} (${email}):\n\n${message}`,
//     };
  
//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send("Error sending message");
//       }
//       res.status(200).json({Message:"Message sent successfully"});
//     });
//   });
  
//    app.post("/create-checkout-session3",async(req,res)=>{
//      try {
//           // Assuming you're sending the products data from frontend to backend
//           const { products } = req.body;
      
//           // Prepare line items for Stripe
//           const lineItems = products.map((product) => ({
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: product.name,
//                 images: product.image ? [product.image] : [],
//               },
//               unit_amount: Math.round(product.price * 100), // Stripe expects the amount in cents
//             },
//             quantity: product.quantity,
//           }));
      
//           // Create Stripe checkout session
//           const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: "http://localhost:3000/success",  // Update this with your success page
//             cancel_url: "http://localhost:3000/cancel", 
//             // 
//             //    // Update this with your cancel page

            
//           });
      
//           // Send the session ID back to frontend
//           res.json({ id: session.id });
//         } catch (error) {
//           console.error("Error creating checkout session:", error);
//           res.status(500).json({ error: "Internal server error" });
//         }
//    }
   
//    )
// // app.use('/api/payments', stripeRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import cookieParser from 'cookie-parser'

import authRoutes from '../routers/auth.js'
import bookingRoutes from '../routers/booking.js'

dotenv.config()

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}))

// MongoDB connection
mongoose.connect("mongodb+srv://gakizalievin219:CeIh29b53hhQyT7O@cluster0.4oc1l.mongodb.net/")
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.log(`Database connection failed: ${err}`))

// Routes
app.use('/api/auth', authRoutes)
app.use('/', bookingRoutes)
async function handleStripeSession(req, res, success_url, cancel_url) {
    try {
      const { products } = req.body;
  
      const lineItems = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url,
        cancel_url,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error("Stripe error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  app.post("/create-checkout-session-gold1", async (req, res) => {
    console.log("Body received:", req.body); // Add this
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });  
  
  app.post("/create-checkout-session-gold2", async (req, res) => {
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });
  
  app.post("/create-checkout-session-silver1", async (req, res) => {
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });
  
  app.post("/create-checkout-session-silver2", async (req, res) => {
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });
  
  app.post("/create-checkout-session-silver3", async (req, res) => {
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });
  
  app.post("/create-checkout-session-extension", async (req, res) => {
    await handleStripeSession(req, res, "http://localhost:3000/success", "http://localhost:3000/cancel");
  });
  
// Stripe Payment Routes

// General Checkout
app.post('/create-checkout-session', async (req, res) => {
  handleStripeCheckout(req, res, {
    success: 'http://localhost:3000/success',
    cancel: 'http://localhost:3000/cancel'
  })
})

// Support Checkout
app.post('/create-checkout-session2', async (req, res) => {
  handleStripeCheckout(req, res, {
    success: 'http://localhost:3000/Success',
    cancel: 'http://localhost:3000/Support'
  })
})

// Coaching Checkout
app.post('/create-checkout-session3', async (req, res) => {
  handleStripeCheckout(req, res, {
    success: 'http://localhost:3000/success',
    cancel: 'http://localhost:3000/cancel'
  })
})

// Shared Stripe checkout logic
async function handleStripeCheckout(req, res, urls) {
  try {
    const { products } = req.body
    const lineItems = products.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: product.image ? [product.image] : [],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: urls.success,
      cancel_url: urls.cancel,
    })

    res.json({ id: session.id })
  } catch (error) {
    console.error('Stripe session error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Contact Form Route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `You received a message from ${name} (${email}):\n\n${message}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email send error:', error)
      return res.status(500).send('Error sending message')
    }
    res.status(200).json({ message: 'Message sent successfully' })
  })
})

// Server Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))