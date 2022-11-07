require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/stripe');
const cors = require("cors");




// Connect DB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Routess
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", paymentRoute)



// Listening
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 4000, 
        () => console.log(`Server runs o port ${process.env.PORT}`)
    );
})


