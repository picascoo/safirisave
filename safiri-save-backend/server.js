// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import { initializeSocket } from './socket/socketHandler.js';

// --- Import Routes HERE (before any await statements) ---
import compareRoutes from './routes/compareRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// --- Load Environment Variables ---
dotenv.config();

// --- Global Error Logging ---
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// --- Initialize Express ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
if (!process.env.FRONTEND_URL) {
  console.warn(
    'FRONTEND_URL not set. CORS may block requests. Set FRONTEND_URL in Render dashboard.'
  );
}
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

// --- Connect to MongoDB ---
try {
  await connectDB();
  console.log('MongoDB connected successfully');
} catch (err) {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
}

// --- API Routes ---
app.use('/api/compare', compareRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// --- Socket.io Setup ---
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

initializeSocket(io);

// --- Production notice ---
if (process.env.NODE_ENV === 'production') {
  console.log(
    'Backend running in production on Render — frontend hosted separately on Vercel.'
  );
}

// --- Start Server ---
httpServer.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});