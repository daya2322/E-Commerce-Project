import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatedProducts.css';
import data_product from '../Assets/Frontend_Assets/data';

const RelatedProducts = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };


  return (
    <div className="container my-5 relatedproducts">
      <h1 className="text-center text-uppercase fw-bold mb-4 text-secondary">Related Products</h1>
      <hr className="mb-4 border-2 border-dark" />
      <div className="row g-4">
        {data_product.map((item, i) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
            <div
              className="card shadow-sm border-0 rounded text-center p-2"
              onClick={() => handleProductClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top img-fluid p-3"
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title text-truncate">{item.name}</h5>
                <p className="card-text text-danger fw-bold">
                  ₹{item.new_price}{' '}
                  <small className="text-muted text-decoration-line-through ms-2">
                    ₹{item.old_price}
                  </small>
                </p>
                <button
                  className="btn btn-secondary w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
