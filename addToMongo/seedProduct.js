const mongoose = require("mongoose");

// MongoDB Connection
const MONGO_URI = "mongodb+srv://infolevelinfinity:levelinfinity@levelinfinity0.fe643.mongodb.net/?retryWrites=true&w=majority&appName=Levelinfinity0"; // Replace with your connection string
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Product Schema and Model
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  photos: [String]
});

const Product = mongoose.model("Product", productSchema);

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Item 1",
    price: 3000,
    description: "Description for Item 1",
    photos: [
      '../assests/pictures/picture1.webp', '../assests/pictures/picture2.webp', '../assests/pictures/picture3.webp'
    ]
  },
  {
    id: 2,
    name: "Item 2",
    price: 2500,
    description: "Description for Item 2",
    photos: [
      '../assests/pictures/picture4.webp', '../assests/pictures/picture5.webp', '../assests/pictures/picture6.webp'
    ]
  },
  {
    id: 3,
    name: "Item 3",
    price: 3000,
    description: "Description for Item 3",
    photos: [
      '../assests/pictures/picture7.webp', '../assests/pictures/picture8.jpg', '../assests/pictures/picture9.webp'
    ]
  },
  {
    id: 4,
    name: "Item 3",
    price: 2000,
    description: "Description for Item 3",
    photos: [
      '../assests/pictures/picture1.webp', '../assests/pictures/picture2.webp', '../assests/pictures/picture3.webp'
    ]
  },
  {
    id: 5,
    name: "Item 3",
    price: 3500,
    description: "Description for Item 3",
    photos: [
      '../assests/pictures/picture4.webp', '../assests/pictures/picture5.webp', '../assests/pictures/picture6.webp'
    ]
  },
  {
    id: 6,
    name: "Item 3",
    price: 3999,
    description: "Description for Item 3",
    photos: [
      '../assests/pictures/picture7.webp', '../assests/pictures/picture8.jpg', '../assests/pictures/picture9.webp'
    ]
  }
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


// const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://infolevelinfinity:levelinfinity@cluster0.mongodb.net/levelinfinity?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

// client.connect()
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Your MongoDB logic here
//   })
//   .catch(err => console.error(err));



