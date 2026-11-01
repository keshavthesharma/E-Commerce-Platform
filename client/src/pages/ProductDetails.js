import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    
    // Access the cart context
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch the single product using the relative path
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
                loading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <h2>Loading product details...</h2>;
    if (!product.name) return <h2>Product not found</h2>;

    return (
        <div style={{ display: 'flex', gap: '30px', padding: '20px', flexWrap: 'wrap' }}>
            <img 
                src={product.image} 
                alt={product.name} 
                style={{ maxWidth: '400px', width: '100%', border: '1px solid #ccc' }} 
            />
            <div style={{ maxWidth: '500px' }}>
                <h2>{product.name}</h2>
                <p style={{ color: '#555' }}><strong>Category:</strong> {product.category}</p>
                <p>{product.description}</p>
                <h3>₹{product.price}</h3>
                
                {/* Button connected to the CartContext */}
                <button 
                    onClick={() => addToCart(product)} 
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                    Add to Cart
                </button>
                
                <div style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                        &larr; Back to Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;