const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const products = require('./data/products');

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const importData = async () => {
    try {
        // Clear existing products to avoid duplicates
        await Product.deleteMany(); 
        
        // Insert new dummy products
        await Product.insertMany(products);
        
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();