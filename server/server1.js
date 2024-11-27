const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require("bcryptjs");


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

// Define a schema
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a model
const Customer = mongoose.model("Customer", customerSchema);

// API endpoint for signup
app.post("/api/customers", async (req, res) => {
  try {
    const { email, password, ...otherFields } = req.body;

    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      email,
      password: hashedPassword,
      ...otherFields,
    });

    await newCustomer.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Error registering user." });
  }
});

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