import axios from 'axios';
import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const apiurl = process.env.REACT_APP_API_URL;


  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async () => {
    try {
      if (!formData.email || !formData.password) {
        return alert("Please fill in all required fields.");
      }

      if (!isValidEmail(formData.email)) {
        return alert("Please enter a valid email address.");
      }

      console.log("Login Function Executed", formData);
      const response = await axios.post(`${apiurl}/login`, formData);
      console.log(response);

      if (response.data.success) {
        localStorage.setItem('auth-token', response.data.token);
        window.location.replace("/");
      } else {
        alert(response.data.errors || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async () => {
    try {
      if (!formData.username || !formData.email || !formData.password) {
        return alert("Please fill in all required fields.");
      }

      if (!isValidEmail(formData.email)) {
        return alert("Please enter a valid email address.");
      }

      console.log("Signup Function Executed", formData);
      const response = await axios.post(`${apiurl}/signup`, formData);
      console.log(response);

      if (response.data.success) {
        localStorage.setItem('auth-token', response.data.token);
        window.location.replace("/");
      } else {
        alert(response.data.errors || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state === "Sign Up" && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Enter Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className='loginsignup_login'>
            Already have an account?
            <span onClick={() => setState("Login")}> Login Here</span>
          </p>
        ) : (
          <p className='loginsignup_login'>
            Create an account?
            <span onClick={() => setState("Sign Up")}> Click Here</span>
          </p>
        )}

        <div className="loginsignup_agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
