const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
require('dotenv').config(); // Loads variables from .env

const app = express();

// Middleware to parse JSON and allow frontend requests
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products'); // Added Product routes import

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Added Product routes registration
app.use('/api/orders', orderRoutes);

// Basic API Route
app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Start the server ONLY if not in production (Vercel handles this automatically)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;