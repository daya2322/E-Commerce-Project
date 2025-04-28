const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const auth = require('./middleware/auth');
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// MongoDB connection
main().then(() => console.log("MongoDB connected")).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://webrocks2024:Dayanand%402004@shoppers.aap9k.mongodb.net/?retryWrites=true&w=majority&appName=Shoppers');
}

// Static file serving for uploaded images
app.use('/images', express.static('upload/images'));

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ================= Schema Definitions =================

// Product schema
const Product = mongoose.model('Product', {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});

// User schema
const User = mongoose.model('Users', {
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

// ================= Routes =================

// Test route
app.get('/', (req, res) => {
  res.send("Express app is running");
});

// Image upload route
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Add product
app.post('/addproduct', async (req, res) => {
  const products = await Product.find();
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({ id, ...req.body });
  await product.save();

  res.json({ success: true, name: req.body.name });
});

// Delete product
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// Get all products
app.get('/allproducts', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// New collections
app.get('/newcollections', async (req, res) => {
  const products = await Product.find();
  const newCollection = products.slice(-8);
  res.send(newCollection);
});

// Popular in women
app.get('/popularinwomen', async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
});

// ================= Auth Routes =================

// Sign up
app.post('/signup', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).json({ success: false, errors: 'Email already exists' });

  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new User({ name: req.body.username, email: req.body.email, password: req.body.password, cartData: cart });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
  res.json({ success: true, token });
});

// Login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.json({ success: false, errors: "Invalid email or password" });
  }

  const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
  res.json({ success: true, token });
});

// ================= Cart Routes =================

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ errors: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid token" });
  }
};

app.post('/addtocart', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.send("Added");
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) {
    user.cartData[req.body.itemId] -= 1;
    await user.save();
  }
  res.send("Removed");
});

app.post('/getcart', fetchUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData);
});

// ================= Razorpay =================

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_HXog0KTHYR7Ahl", // Replace with your Razorpay key ID
  key_secret: "6pgRMNzgTgthvY6R6N4R4pOG", // Replace with your Razorpay secret
});

// Razorpay order route
app.post("/order", async (req, res) => {
  try {
    const options = {
      amount: 399900, // Amount in paise (100 INR)
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1, // Auto-capture payment
    };

    const response = await razorpayInstance.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    res.status(500).send("Internal server error");
  }
});


// ================= Email =================

app.post("/sendemail/:id", async (req, res) => {
  const email = req.params.id;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Shopping",
    text: "Thanks for shopping with us! Have a nice day 😊",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// ================= User Profile =================

// Get profile
app.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
app.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, email, phone },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  // Setup nodemailer (you can replace this with DB save logic too)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL, // use your email
        pass: process.env.CONTACT_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.post("/clearcart",fetchUser, async (req, res) => {

  console.log(req.user.id)
  const user = await User.findById(req.user.id);
  console.log(user)
  if (user) {
    const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;
    user.cartData = cart; // or reset with your default cart shape
    await user.save();
    res.json({ success: true, message: "Cart cleared successfully" });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});


// ================= Start Server =================
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
