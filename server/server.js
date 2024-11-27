const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://infolevelinfinity:WvSEombRajO9WMVd@levelinfinity.hqlox.mongodb.net/LIDB?retryWrites=true&w=majority&appName=levelinfinity");


// Define the existing Product model
const Product = mongoose.model('Product', new mongoose.Schema({}), 'products'); // Replace 'products' with your collection name

// API endpoint to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all documents
    res.json(products); // Send the data to the frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Schema for User and OTP
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Expires in 10 minutes
});

const Customer = mongoose.model("Customer", customerSchema);
const OTP = mongoose.model("OTP", otpSchema);
const mailuser = process.env.EMAIL_USER;
const mailpass = process.env.EMAIL_PASS;


// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: mailuser,
    pass: mailpass,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// 1. Send OTP
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  
  if (!email) return res.status(400).send("Email is required.");

  try {
    // Check if the email already exists in the User collection
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered. Please login.");
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP in database (associated with the email)
    await OTP.create({ email, otp });

    // Send OTP to the provided email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP - Level Infinity",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).send("OTP sent to your email.");
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).send("Failed to send OTP. Please try again.");
  }
});

// 2. Verify OTP
app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).send("Email and OTP are required.");

  try {
    const existingOtp = await OTP.findOne({ email, otp });
    if (!existingOtp) return res.status(400).send("Invalid OTP.");

    // OTP is valid
    await OTP.deleteMany({ email }); // Clear OTP after successful verification
    res.status(200).send("OTP verified successfully.");
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).send("OTP verification failed.");
  }
});

// 3. Register User
app.post("/api/customers", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).send("All fields are required.");

  try {
      // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Proceed with user registration
    const newUser = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the new user to the database
    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Failed to register user.");
  }
});

// 4. Login User

app.post("/api/customers/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful!", name: customer.firstName, });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



