const mongoose = require("mongoose");

// MongoDB Connection
const MONGO_URI = "mongodb+srv://infolevelinfinity:WvSEombRajO9WMVd@levelinfinity.hqlox.mongodb.net/LIDB?retryWrites=true&w=majority&appName=levelinfinity"; // Replace with your connection string
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Product Schema and Model
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  photos: [String],
  sizes: [
    {
      size: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true },
      inventory: { type: Number, required: true, min: 0 },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Item 1",
    price: 3000,
    description: "Description for Item 1",
    photos: ['img1', 'img2', 'img3'],
    sizes: [
      { size: "XS", inventory: 10 },
      { size: "S", inventory: 15 },
      { size: "M", inventory: 20 },
      { size: "L", inventory: 25 },
      { size: "XL", inventory: 5 },
    ],
  },
  {
    id: 2,
    name: "Item 2",
    price: 2500,
    description: "Description for Item 2",
    photos: ['img4', 'img5', 'img6'],
    sizes: [
      { size: "XS", inventory: 5 },
      { size: "S", inventory: 10 },
      { size: "M", inventory: 15 },
      { size: "L", inventory: 10 },
      { size: "XL", inventory: 5 },
    ],
  },
  {
    id: 3,
    name: "Item 3",
    price: 3000,
    description: "Description for Item 3",
    photos: ['img7', 'img8', 'img9'],
    sizes: [
      { size: "XS", inventory: 8 },
      { size: "S", inventory: 12 },
      { size: "M", inventory: 18 },
      { size: "L", inventory: 20 },
      { size: "XL", inventory: 6 },
    ],
  },
  {
    id: 4,
    name: "Item 4",
    price: 2000,
    description: "Description for Item 4",
    photos: ['img10', 'img11', 'img12'],
    sizes: [
      { size: "XS", inventory: 7 },
      { size: "S", inventory: 14 },
      { size: "M", inventory: 18 },
      { size: "L", inventory: 12 },
      { size: "XL", inventory: 9 },
    ],
  },
  {
    id: 5,
    name: "Item 5",
    price: 3500,
    description: "Description for Item 5",
    photos: ['img13', 'img14', 'img15'],
    sizes: [
      { size: "XS", inventory: 6 },
      { size: "S", inventory: 8 },
      { size: "M", inventory: 15 },
      { size: "L", inventory: 14 },
      { size: "XL", inventory: 3 },
    ],
  },
  {
    id: 6,
    name: "Item 6",
    price: 3999,
    description: "Description for Item 6",
    photos: ['img16', 'img17', 'img18'],
    sizes: [
      { size: "XS", inventory: 5 },
      { size: "S", inventory: 10 },
      { size: "M", inventory: 20 },
      { size: "L", inventory: 25 },
      { size: "XL", inventory: 10 },
    ],
  },
];

// Insert Products into MongoDB
const seedProducts = async () => {
  try {
    await Product.insertMany(products);
    console.log("Products Seeded Successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error Seeding Products:", error);
  }
};

seedProducts();
