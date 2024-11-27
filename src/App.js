import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import { CartContext } from "../src/pages/CartContext"; // Assuming you have a CartContext
import '../src/styles/Cart.css'; // Import CSS for styling

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const { cart } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleAddToCart = (product) => {
    // Logic to add the selected product to the cart
  };

  const handleBuyNow = (product) => {
    // Logic to proceed directly to the checkout with the selected product
  };

  return (
    <Router>
      <Navbar toggleCart={toggleCart} /> {/* Pass toggleCart to Navbar */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/product/:id" 
          element={<ProductDetail onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />} 
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
