import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('All');
    
    // The categories based on your product data
    const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home']; 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Send the keyword and category as query parameters to the backend using a relative path
                const { data } = await axios.get(`/api/products?keyword=${keyword}&category=${category}`);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        // Fetch products whenever the keyword or category changes
        fetchProducts();
    }, [keyword, category]);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '20px' }}>Latest Products</h1>
            
            {/* Search and Filter Bar */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <input 
                    type="text" 
                    className="input-field"
                    placeholder="Search products by name..." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ width: '300px' }}
                />
                <select 
                    className="input-field"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ cursor: 'pointer' }}
                >
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <h3 style={{ gridColumn: '1 / -1' }}>No products found.</h3>
                )}
            </div>
        </div>
    );
};

export default Home;