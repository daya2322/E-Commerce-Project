import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from '../Context/ShopContext';

const Payment = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "", type: "" });
  const [cartItems, setCartItems] = useState([]);
  const [paymentError, setPaymentError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [pincodeError, setPincodeError] = useState("");

  const { getTotalCartAmount, clearCart, cartItems: contextCartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const apiurl = process.env.REACT_APP_API_URL;


  // ✅ Safely load cart item(s)
  useEffect(() => {
    const fetchProductOrCart = async () => {
      if (id) {
        try {
          const res = await axios.get(`${apiurl}/allproducts/${id}`);
          setCartItems([res.data]); // wrap single product in array
        } catch (error) {
          console.error("Error fetching product:", error);
          setCartItems([]);
        }
      } else {
        if (Array.isArray(contextCartItems)) {
          setCartItems(contextCartItems);
        } else {
          setCartItems([]);
        }
      }
    };

    fetchProductOrCart();
  }, [id, contextCartItems, apiurl]);

  const handleSaveAddress = () => {
    if (!newAddress.phone.match(/^[0-9]{10}$/)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    } else {
      setPhoneError("");
    }

    if (!newAddress.type.match(/^\d{6}$/)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    } else {
      setPincodeError("");
    }

    if (newAddress.name && newAddress.phone && newAddress.address && newAddress.type) {
      const newId = `address-${addresses.length + 1}`;
      const newAddrObj = { ...newAddress, id: newId };
      setAddresses([...addresses, newAddrObj]);
      setSelectedAddress(newId);
      setShowAddressForm(false);
      setNewAddress({ name: "", phone: "", address: "", type: "" });
    }
  };

  const calculateTotalAmount = () => {
    if (id) return cartItems.reduce((acc, item) => acc + item.price, 0);
    return getTotalCartAmount();
  };

  const handleProceedToPay = async () => {
    if (!selectedAddress) {
      setPaymentError("Please select a delivery address.");
      return;
    }

    if (!paymentMethod) {
      setPaymentError("Please select a payment method.");
      return;
    }

    setPaymentError("");

    if (paymentMethod === "online") {
      await createRazorpayOrder();
    } else {
      alert("Order Placed Successfully!");
      clearCart();
      navigate("/order-success");
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async () => {
    const amountInPaise = calculateTotalAmount() * 100;
    const data = {
      amount: amountInPaise,
      currency: "INR",
      receipt: "receipt#1",
    };

    try {
      const response = await axios.post(`${apiurl}/order`, data);
      handleRazorpayScreen(response.data.amount, response.data.id);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create Razorpay order.");
    }
  };

  const handleRazorpayScreen = async (amount, orderId) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_HXog0KTHYR7Ahl",
      amount: amount,
      currency: "INR",
      name: "Your Business Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo.png",
      order_id: orderId,
      handler: function (response) {
        alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
        clearCart();
        navigate("/order-success");
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side */}
        <div className="col-md-8">
          {/* Address Section */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">DELIVERY ADDRESS</h5>
              {addresses.map((addr) => (
                <div className="form-check" key={addr.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="address"
                    id={addr.id}
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                  />
                  <label className="form-check-label" htmlFor={addr.id}>
                    <strong>{addr.name}</strong> ({addr.type}) {addr.phone}
                    <p>{addr.address}</p>
                  </label>
                </div>
              ))}
              <button className="btn btn-link" onClick={() => setShowAddressForm(!showAddressForm)}>
                + Add a new address
              </button>
              {showAddressForm && (
                <div className="card mt-3 p-3">
                  <h5 className="card-title">Add New Address</h5>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Phone Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  />
                  {phoneError && <div className="text-danger">{phoneError}</div>}
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Pincode"
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                  />
                  {pincodeError && <div className="text-danger">{pincodeError}</div>}
                  <button className="btn btn-success" onClick={handleSaveAddress}>Save Address</button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setShowOrderDetails(!showOrderDetails)} style={{ cursor: "pointer" }}>
                ORDER SUMMARY
              </h5>
              {showOrderDetails && (
                <div>
                  {Array.isArray(cartItems) && cartItems.map((item) => (
                    <p key={item.id}>{item.name} - ₹{item.price}</p>
                  ))}
                  <p>Subtotal: ₹{calculateTotalAmount()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Options */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">PAYMENT OPTIONS</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="form-check-label" htmlFor="cod">Cash on Delivery (COD)</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <label className="form-check-label" htmlFor="online">Online Payment</label>
              </div>
              {paymentError && <div className="text-danger mt-2">{paymentError}</div>}
              <button className="btn btn-primary mt-3" onClick={handleProceedToPay}>Proceed to Pay</button>
            </div>
          </div>
        </div>

        {/* Right Side - Price Details */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">PRICE DETAILS</h5>
              <p>Price ({cartItems.length} item): ₹{calculateTotalAmount()}</p>
              <p>Platform Fee: ₹0</p>
              <hr />
              <h5>Total Payable: ₹{calculateTotalAmount()}</h5>
              <p className="text-muted">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
