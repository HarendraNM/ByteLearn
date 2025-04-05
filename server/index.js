import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import courseRoute from './routes/courseRoute.js';
import mediaRoute from './routes/mediaRoute.js';

dotenv.config(); 

const PORT=process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))


app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/media',mediaRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

