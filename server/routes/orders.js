const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Order = require('../models/Order');

// POST: Place a new order (Protected Route)
router.post('/', protect, async (req, res) => {
    try {
        const { orderItems, deliveryDetails, totalAmount } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user, // Attached by the 'protect' middleware
            orderItems,
            deliveryDetails,
            totalAmount
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order' });
    }
});

// GET: Fetch logged-in user's orders (Protected Route)
router.get('/myorders', protect, async (req, res) => {
    try {
        // req.user._id is provided by your protect middleware
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

module.exports = router;