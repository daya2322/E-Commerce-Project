import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/ShopCategory.css';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  return (
    <div className='container my-5'>
      <img className='img-fluid w-100 mb-4 rounded' src={props.banner} alt='Category Banner' />
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <p className='fw-bold'>Showing 1-12 out of 36 products</p>
        {/* <div className='dropdown'>
          <button className='btn btn-outline-primary dropdown-toggle' type='button'>
            Sort by <img src={dropdown_icon} alt='' className='ms-2' />
          </button>
        </div> */}
      </div>
      <div className='row g-4'>
        {all_product.map((item, i) => (
          item.category === props.category && (
            <div key={i} className='col-lg-3 col-md-4 col-sm-6'>
              <div className='card shadow-sm border-0 rounded text-center p-2'onClick={() => handleProductClick(item.id)} >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className='card-img-top img-fluid p-3' 
                  style={{ height: '200px', objectFit: 'contain' }} 
                />
                <div className='card-body'>
                  <h5 className='card-title text-truncate'>{item.name}</h5>
                  <p className='card-text text-danger fw-bold'>₹{item.new_price} <small className='text-muted text-decoration-line-through'>₹{item.old_price}</small></p>
                  <button className='btn btn-primary w-100'>Buy Now</button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      {/* <div className='text-center mt-4'>
        <button className='btn btn-outline-dark'>Explore More</button>
      </div> */}
    </div>
  );
};

export default ShopCategory;