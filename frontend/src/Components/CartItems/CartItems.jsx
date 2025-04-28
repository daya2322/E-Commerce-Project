import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [userID, setUserID] = useState(null);
    const [promoCode, setPromoCode] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserID(decoded.user.email);
            console.log('User ID:', decoded.user.email);
        }
    }, []);

    const isAuthenticated = () => {
        return localStorage.getItem('auth-token');
    };

    const handleRemoveFromCart = (id) => {
        if (!isAuthenticated()) {
            window.location.replace('/login');
        } else {
            removeFromCart(id);
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated()) {
            window.location.replace('/login');
        } else {
            navigate('/payment');
        }
    };

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleSubmit = () => {
        if (promoCode === "DISCOUNT10") {
            alert('Promo code applied successfully!');
        } else {
            alert('Promo code is invalid, please try another one.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Your Cart</h2>

            {/* Table Header */}
            <div className="row text-center fw-bold border-bottom pb-2">
                <div className="col-2">Product</div>
                <div className="col-3">Title</div>
                <div className="col-2">Price</div>
                <div className="col-2">Quantity</div>
                <div className="col-2">Total</div>
                <div className="col-1">Remove</div>
            </div>

            {/* Cart Items */}
            {all_product.map((item) => {
                if (cartItems[item.id] > 0) {
                    return (
                        <div key={item.id} className="row text-center align-items-center border-bottom py-2">
                            <div className="col-2">
                                <img src={item.image} alt="" className="img-fluid rounded" style={{ width: "50px", height: "50px" }} />
                            </div>
                            <div className="col-3">{item.name}</div>
                            <div className="col-2">${item.new_price}</div>
                            <div className="col-2">
                                <span className="badge bg-secondary">{cartItems[item.id]}</span>
                            </div>
                            <div className="col-2">${item.new_price * cartItems[item.id]}</div>
                            <div className="col-1">
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => handleRemoveFromCart(item.id)}>
                                    X
                                </button>
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            {/* Cart Summary Section */}
            <div className="row mt-4">
                <div className="col-md-6">
                    {/* Promo Code Section */}
                    <div className="card shadow p-3">
                        <h5>If you have a promo code, enter it here:</h5>
                        <div className="input-group mt-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Promo code"
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                            />
                            <button className="btn btn-primary" onClick={handleSubmit}>Apply</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    {/* Cart Totals */}
                    <div className="card shadow p-3">
                        <h4 className="fw-bold">Cart Totals</h4>
                        <div className="d-flex justify-content-between mt-2">
                            <span>Subtotal:</span>
                            <span>${getTotalCartAmount()}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Shipping Fee:</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total:</span>
                            <span>${getTotalCartAmount()}</span>
                        </div>
                        <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
