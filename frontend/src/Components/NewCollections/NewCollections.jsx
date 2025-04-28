import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewCollections.css';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const navigate = useNavigate();
console.log('object')
const apiurl = process.env.REACT_APP_API_URL;

  console.log(apiurl)

  useEffect(() => {
    axios
      .get(`${apiurl}/newcollections`) 
      .then((response) => {
        setNewCollection(response.data);
      })
      .catch((error) => {
        console.error('Error fetching new collections:', error);
      });
  }, [apiurl]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-uppercase fw-bold mb-4 text-success">New Collections</h1>
      <hr className="mb-4 border-2 border-dark" />
      <div className="row g-4">
        {newCollection.map((item) => (
          <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
            <div 
              className="card shadow-sm border-0 rounded text-center p-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleProductClick(item._id)}
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
                <button 
                  className="btn btn-success w-100" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    navigate(`/buy/${item._id}`);
                  }}
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

export default NewCollections;
