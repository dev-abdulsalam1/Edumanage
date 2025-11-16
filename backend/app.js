import express from 'express';
import dotenv from 'dotenv';
import AppError from './utils/AppError.js';
import cors from "cors";

// Import routes
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import classRoutes from './routes/classRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

//cors
app.use(cors());


// Middlewares
app.use(express.json());

// Mount API routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/users', userRoutes);

// Example root route
app.get('/', (req, res) => {
    res.send('✅ Server is running successfully!');
});

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message || 'Something went wrong!',
    });
});

export default app;
