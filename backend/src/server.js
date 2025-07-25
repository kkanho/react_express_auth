import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/react_express_auth");
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ DB Connection Error:', error.message);
        process.exit(1);
    }
};

// Start server
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();