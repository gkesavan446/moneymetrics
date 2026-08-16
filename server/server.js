import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import transactionRouter from './routes/transactionRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';

dotenv.config();

//connection to Database
connectDB();

const app = express()

const PORT = process.env.PORT || 3333

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    return res.status(200).json({ message: "Money Metrics API is running" })
})

app.use('/api/auth', authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(errorMiddleware);

mongoose.connection.once('open', () => {
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
        console.log(`Server is connected and running in port: ${PORT}`)
    })
})


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });