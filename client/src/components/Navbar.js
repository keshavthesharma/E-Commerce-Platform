import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Check if the user is authenticated by looking for the JWT in local storage
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        // Clear the session data
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <nav style={{ padding: '15px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" 
                    alt="Logo" 
                    style={{ height: '30px', width: '30px', objectFit: 'contain', filter: 'invert(1)' }} 
                />
                <h2 style={{ margin: 0 }}>My E-Commerce</h2>
            </Link>
            <div>
                <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
                <Link to="/cart" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Cart</Link>
                
                {/* Conditionally render Profile/Logout or Login/Register based on auth state */}
                {token ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '15px' }}>
                        <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
                        <button 
                            onClick={handleLogout} 
                            style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px', fontSize: '14px' }}
                        >
                            Logout
                        </button>
                    </span>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;