import React from 'react';

const OrderSuccess = () => {


  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="card shadow p-4 text-center" style={{ maxWidth: '500px', borderRadius: '20px' }}>
        <div className="mb-3" style={{ fontSize: '4rem', color: '#28a745' }}>✅</div>
        <h2 className="mb-2">Order Placed Successfully!</h2>
        <p className="text-muted mb-4">Your order is confirmed and will be shipped soon.</p>
        <a href="/" className="btn btn-success w-100">Continue Shopping</a>
      </div>
    </div>
  );
};

export default OrderSuccess;
