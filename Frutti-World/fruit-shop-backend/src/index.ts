import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import fruitRoutes from './routes/FruitsRoutes'; 
import UserRoutes from './routes/UserRoutes';
import StoreRoutes from './routes/StoreRoutes';
import OrderRoutes from './routes/OrderRoutes';
import PaymentRoutes from './routes/PaymentRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// To allow cross-origin requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/store', StoreRoutes);
app.use('/api/v1/fruits', fruitRoutes);
app.use('/api/v1/orders', OrderRoutes);       
app.use('/api/v1/payments', PaymentRoutes);   

app.get('/', (req, res) => {
    res.send("Hello");
});

// mongodb configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fruitsshop")
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    })
    .catch((e) => {
        console.error(e);
    });
