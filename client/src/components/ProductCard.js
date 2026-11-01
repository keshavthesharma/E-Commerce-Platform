import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Image Section */}
            <div style={{ backgroundColor: '#f4f4f4', padding: '20px', textAlign: 'center' }}>
                <img 
                    src={product.image || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'contain' }}
                />
            </div>
            
            {/* Details Section */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#222' }}>{product.name}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5' }}>
                    {product.description?.substring(0, 60)}...
                </p>
                
                {/* Price and Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#28a745' }}>
                        ₹{product.price}
                    </span>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn-primary">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;