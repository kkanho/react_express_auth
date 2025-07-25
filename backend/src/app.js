import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// import routers
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { uploadImageRoutes } from './routes/uploadImageRoutes.js';

const app = express();

// Security middlewares FIRST
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploadthing", uploadImageRoutes);

// Error handling
app.use('*', (req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
});

export default app;