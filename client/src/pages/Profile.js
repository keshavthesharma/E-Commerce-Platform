import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyOrders = async () => {
            const token = localStorage.getItem('token');
            // Redirect to login if the user is not authenticated
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [navigate]);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>My Profile & Order History</h2>
            
            {orders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Order ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Total</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{order._id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>₹{order.totalAmount.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc', color: '#28a745' }}>Paid</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Profile;