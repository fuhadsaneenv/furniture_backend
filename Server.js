
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './src/config/dbconfig.js';
import userRoute from './src/routes/userRoute.js';
import productRoute from './src/routes/productRoute.js';
import cartRoute from './src/routes/cartRoute.js';
import wishlistRoute from './src/routes/wishlistRoute.js'
import cookieParser from 'cookie-parser';
import orderRoute from './src/routes/orderRoute.js';
import errorHandler from './src/middleware/errorHandler.js'
import adminRoute from './src/routes/adminRoute.js'

dotenv.config();

const app = express();
connectDB()


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());                                   //  parse cookies into req.cookies

app.use('/api/auth', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/wishlist', wishlistRoute);
app.use('/api/orders', orderRoute);
app.use('/api/admin',adminRoute);

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('E-commerce Backend is up and running!');
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })     //ensure that it can successfully connect to the database
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));                // starts the Express server to handle incoming requests and routes
    })
    .catch(err => console.error(err));
