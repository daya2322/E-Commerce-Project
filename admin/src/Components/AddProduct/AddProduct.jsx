import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });
  const [errors, setErrors] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL; // ✅ Fetch API base URL once

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!productDetails.name.trim()) {
      isValid = false;
      errors.name = 'Product name is required';
    }
    if (!productDetails.new_price || isNaN(productDetails.new_price)) {
      isValid = false;
      errors.new_price = 'Valid new price is required';
    }
    if (!productDetails.old_price || isNaN(productDetails.old_price)) {
      isValid = false;
      errors.old_price = 'Valid old price is required';
    }
    if (!image) {
      isValid = false;
      errors.image = 'Image is required';
    }

    setErrors(errors);
    return isValid;
  };

  const Add_Product = async () => {
    if (!validate()) {
      return; // Stop if validation fails
    }

    try {
      let formData = new FormData();
      formData.append('product', image);

      // ✅ First upload image
      const uploadResponse = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const updatedProduct = {
          ...productDetails,
          image: uploadData.image_url, // ✅ Set uploaded image URL
        };

        // ✅ Then add product details
        const addProductResponse = await fetch(`${apiUrl}/addproduct`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          alert("✅ Product Added Successfully!");
          // Clear the form
          setProductDetails({
            name: '',
            image: '',
            category: 'women',
            new_price: '',
            old_price: '',
          });
          setImage(null);
          setErrors({});
        } else {
          alert("❌ Failed to add product!");
        }
      } else {
        alert("❌ Image upload failed!");
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className='add_product'>
      <div className="addproduct_itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder='Type here'
        />
        {errors.name && <p className="error" style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div className="addproduct_price">
        <div className="addproduct_itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name='old_price'
            placeholder='Type here'
          />
          {errors.old_price && <p className="error" style={{ color: "red" }}>{errors.old_price}</p>}
        </div>
        <div className="addproduct_itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name='new_price'
            placeholder='Type here'
          />
          {errors.new_price && <p className="error" style={{ color: "red" }}>{errors.new_price}</p>}
        </div>
      </div>

      <div className="addproduct_itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='add_product_selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct_itemfield">
        <label htmlFor="file_input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct_thumnail_img'
            alt="Product Preview"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name='image'
          id='file_input'
          hidden
        />
        {errors.image && <p className="error" style={{ color: "red" }}>{errors.image}</p>}
      </div>

      <button onClick={Add_Product} className='addproduct_btn'>Add</button>
    </div>
  );
};

export default AddProduct;
