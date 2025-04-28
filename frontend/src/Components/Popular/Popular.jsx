import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Popular.css';
import axios from 'axios';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const navigate = useNavigate();
  const apiurl = process.env.REACT_APP_API_URL;
 

  useEffect(() => {
    axios
      .get(`${apiurl}/popularinwomen`)
      .then((response) => setPopularProducts(response.data))
      .catch((error) => console.error('Error fetching popular products:', error));
  }, [apiurl]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-uppercase fw-bold mb-4 text-primary">Popular Women</h1>
      <hr className="mb-4 border-2 border-dark" />
      <div className="row g-4">
        {popularProducts.map((item, i) => (
          <div key={i} className="col-lg-3 col-md-4 col-sm-6">
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
                  ₹{item.new_price}
                  <small className="text-muted text-decoration-line-through ms-2">
                    ₹{item.old_price}
                  </small>
                </p>
                <button className="btn btn-warning w-100">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
