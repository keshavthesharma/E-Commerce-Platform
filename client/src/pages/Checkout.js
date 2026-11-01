import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Ensure user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const orderData = {
                orderItems: cartItems,
                deliveryDetails: { address, city, postalCode, country },
                totalAmount: cartTotal,
            };

            await axios.post('http://localhost:5000/api/orders', orderData, config);
            
            localStorage.removeItem('cart');
            alert('Order placed successfully!');
            navigate('/'); 
            window.location.reload(); 
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        }
    };

    if (cartItems.length === 0) return <h2>Your cart is empty.</h2>;

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Checkout</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={placeOrderHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ padding: '10px' }} />
                <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ padding: '10px' }} />
                
                <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
                
                <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;