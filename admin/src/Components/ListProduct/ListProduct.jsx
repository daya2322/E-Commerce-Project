import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${apiUrl}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`${apiUrl}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchInfo(); // Refresh after deletion
    } catch (error) {
      console.error('Failed to remove product:', error);
    }
  };

  return (
    <div className='list_product'>
      <h1>All Products List</h1>

      <div className="listproduct_format_main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct_allproducts">
        <hr />
        {allproducts.map((product) => (
          <div key={product._id} className="listproduct_format_main listproduct_format">
            <img className='listproduct_product_icon' src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => remove_product(product._id)}
              className='listproduct_remove_icon'
              src={cross_icon}
              alt="Remove Icon"
            />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
