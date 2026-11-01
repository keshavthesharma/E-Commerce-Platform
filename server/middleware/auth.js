const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Get token from the Authorization header (Format: "Bearer <token>")
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user ID from the JWT payload to the request object
        req.user = decoded.userId;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = protect;