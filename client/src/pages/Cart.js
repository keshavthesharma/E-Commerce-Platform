import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    // Access the cart state and functions from Context
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Your cart is empty</h2>
                <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
                    &larr; Go Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Shopping Cart</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cartItems.map((item) => (
                    <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ccc', padding: '15px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                        
                        <div style={{ flex: 1, marginLeft: '20px' }}>
                            <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#333' }}>
                                <h4>{item.name}</h4>
                            </Link>
                            <p>₹{item.price}</p>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <select 
                                value={item.quantity} 
                                onChange={(e) => updateQuantity(item.product, e.target.value)}
                                style={{ padding: '5px' }}
                            >
                                {/* Creates a dropdown for quantities 1 through 10 */}
                                {[...Array(10).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>
                            
                            <button 
                                onClick={() => removeFromCart(item.product)}
                                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div style={{ marginTop: '30px', textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px' }}>
                <h3>Subtotal: ₹{cartTotal.toFixed(2)}</h3>
                <Link to="/checkout">
                    <button style={{ marginTop: '10px', padding: '12px 25px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', borderRadius: '4px' }}>
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;