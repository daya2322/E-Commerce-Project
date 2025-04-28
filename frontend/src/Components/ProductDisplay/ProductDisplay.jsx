import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { ShopContext } from '../../Context/ShopContext';
import star_dull_icon from '../Assets/Frontend_Assets/star_dull_icon.png';
import star_icon from '../Assets/Frontend_Assets/star_icon.png';

const ProductDisplay = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [added, setAdded] = useState(false);
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState("");
    const [error, setError] = useState(false);

    const apiurl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${apiurl}/allproducts`);
            const products = response.data;
            const filteredProduct = products.find((item) => item.id === Number(productId));
            setProduct(filteredProduct);
        };
        fetchProduct();
    }, [productId, apiurl]);

    const handleCart = () => {
        if (!selectedSize) {
            setError(true);
            return;
        }
        if (!localStorage.getItem("auth-token")) {
            window.location.replace("/login");
        } else {
            addToCart(product.id);
            setAdded(true);
            setError(false);
            setTimeout(() => setAdded(false), 5000);
        }
    };

    return (
        <div className="container mt-4">
            {/* Success & Error Alerts */}
            {added && (
                <div className="alert alert-info text-center" role="alert">
                    Your product has been added to the cart.
                </div>
            )}
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    Please select a size before adding to cart.
                </div>
            )}

            <div className="row g-4">
                {/* Left Section - Product Images */}
                <div className="col-md-5 text-center">
                    <div className="d-flex justify-content-center flex-wrap mb-2">
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={product.image} alt="Product" className="img-thumbnail m-1" style={{ width: "80px", height: "80px" }} />
                        ))}
                    </div>
                    <img src={product.image} alt="Main Product" className="img-fluid rounded shadow-sm" />
                </div>

                {/* Right Section - Product Details */}
                <div className="col-md-6">
                    <h1 className="fw-bold">{product.name}</h1>

                    {/* Star Ratings */}
                    <div className="d-flex align-items-center mb-2">
                        {[...Array(4)].map((_, i) => (
                            <img key={i} src={star_icon} alt="Star" className="me-1" style={{ width: "20px" }} />
                        ))}
                        <img src={star_dull_icon} alt="Star Dull" className="me-1" style={{ width: "20px" }} />
                        <span className="ms-2 text-muted">(122)</span>
                    </div>

                    {/* Price Section */}
                    <div className="d-flex align-items-center mb-3">
                        <span className="text-muted text-decoration-line-through fs-5 me-2">${product.old_price}</span>
                        <span className="text-primary fw-bold fs-4">${product.new_price}</span>
                    </div>

                    {/* Product Description */}
                    <p className="text-muted">
                        A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                    </p>

                    {/* Size Selection */}
                    <div className="mb-3">
                        <h5>Select Size</h5>
                        <div className="row g-2">
                            {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => (
                                <div key={index} className="col-4">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="size" 
                                            id={`size-${index}`} 
                                            value={size} 
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={`size-${index}`}>
                                            {size}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button onClick={handleCart} className="btn btn-primary w-100 py-2">
                        ADD TO CART
                    </button>

                    {/* Categories & Tags */}
                    <p className="mt-3">
                        <strong>Category:</strong> Jacket, T-Shirt, Crop-Top, Hoodies, etc...
                    </p>
                    <p>
                        <strong>Tags:</strong> Modern, Latest
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
