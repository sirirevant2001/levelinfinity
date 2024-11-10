import React, { useState } from 'react';
import '../styles/Contact.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="contact-us-container">
      <h2 className="contact-title">CONNECT WITH US</h2>
      <p className="contact-subtitle">
        WE WOULD LOVE TO HEAR ABOUT YOUR FEEDBACK, INTERESTS AND FUTURE COLLABORATIONS EMAIL AT 
        <a href="mailto:contact@levelinfinity.in"> contact@levelinfinity.in</a>
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>EMAIL *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>PHONE NUMBER</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>COMMENT</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="send-button">SEND</button>
      </form>
    </div>
  );
}

export default ContactUs;
