const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET: Fetch all products (Supports search and category filters)
router.get('/', async (req, res) => {
    try {
        // Extract optional query parameters from the frontend request
        const { keyword, category } = req.query;
        let query = {};

        // Apply search filter if provided
        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' }; 
        }
        
        // Apply category filter if provided (and ignore if it is 'All')
        if (category && category !== 'All') {
            query.category = category;
        }

        // Fetch products matching the query (or all products if no query)
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// GET: Fetch a single product by ID (For the Product Details page)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product details' });
    }
});

module.exports = router;