import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css"; // Add your CSS file for styling

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/customers", formData);
      if (response.status === 201) {
        alert("Sign up successful!");
        setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Reset form
        alert('Login with your New Credentials');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Email already exists in the database.");
      } else {
        console.error("Error during sign-up:", error);
        alert("Sign-up failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
      <h1 className="signup-title">CREATE ACCOUNT</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstName">FIRST NAME</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">LAST NAME</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">CREATE</button>
      </form>
      <div className="login login-style">
        <p style={{margin:'15px'}}>already have an account ?</p>
        <Link to="/login" style={{marginTop:'17.5px', marginLeft: '5px'}} className="login-style">
          LOGIN
        </Link>
      </div>
    </div>
    </div> 
  );
}

export default SignUp;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/SignUp.css"; // Add your CSS file for styling

// function SignUp() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [otp, setOtp] = useState("");
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otpAttempts, setOtpAttempts] = useState(3);
//   const [timer, setTimer] = useState(0); // Countdown timer for retrying OTP
//   const navigate = useNavigate();

//   // Function to handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Function to handle OTP input changes
//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   // Function to handle signup submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/send-otp", { email: formData.email });
//       if (response.status === 200) {
//         alert("OTP sent to your email!");
//         setShowOtpModal(true); // Show OTP modal
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert(error.response.data); // Display error message (e.g., Email already registered)
//       } else {
//         console.error("Error sending OTP:", error);
//         alert("OTP sending failed. Please try again.");
//       }
//     }
//   };

//   // Function to verify OTP
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/verify-otp", { email: formData.email, otp });
//       if (response.status === 200) {
//         alert("OTP verified! Signing up...");
//         await axios.post("/api/customers", formData);
//         alert("Sign up successful!");
//         navigate("/login");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert("Invalid OTP. Please try again.");
//         setOtpAttempts(otpAttempts - 1);

//         if (otpAttempts <= 1) {
//           setOtpAttempts(3);
//           setTimer(600); // Set 10-minute timer
//           alert("You have exceeded the maximum attempts. Please try again after 10 minutes.");
//         }
//       } else {
//         console.error("Error during OTP verification:", error);
//         alert("Failed to verify OTP. Please try again.");
//       }
//     }
//   };

//   // Function to handle OTP resend
//   const handleResendOtp = async () => {
//     if (otpAttempts > 1) {
//       try {
//         await axios.post("/api/send-otp", { email: formData.email });
//         alert("OTP resent to your email!");
//         setOtpAttempts(otpAttempts - 1);
//       } catch (error) {
//         console.error("Error resending OTP:", error);
//         alert("Failed to resend OTP. Please try again.");
//       }
//     } else {
//       alert("You have exceeded the maximum resend attempts. Please try again after 10 minutes.");
//     }
//   };

//   // Timer logic for retry
//   React.useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => setTimer(timer - 1), 1000);
//       return () => clearInterval(countdown);
//     }
//   }, [timer]);

//   return (
//     <div className="signup-body">
//       <div className="signup-container">
//         <h1 className="signup-title">CREATE ACCOUNT</h1>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <div className="form-group">
//             <label htmlFor="firstName">FIRST NAME</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">LAST NAME</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">EMAIL</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">PASSWORD</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="signup-button" disabled={timer > 0}>
//             CREATE
//           </button>
//         </form>
//         <div className="login login-style">
//           <p style={{ margin: "15px" }}>already have an account?</p>
//           <Link to="/login" style={{ marginTop: "17.5px", marginLeft: "5px" }} className="login-style">
//             LOGIN
//           </Link>
//         </div>
//       </div>

//       {/* OTP Modal */}
//       {showOtpModal && (
//         <div className="otp-modal">
//           <h2>Verify Your Email</h2>
//           <form onSubmit={handleOtpSubmit}>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={handleOtpChange}
//               required
//             />
//             <button type="submit">Verify OTP</button>
//           </form>
//           <button onClick={handleResendOtp} disabled={otpAttempts === 0 || timer > 0}>
//             Resend OTP ({otpAttempts} attempts left)
//           </button>
//           {timer > 0 && <p>Retry after {Math.floor(timer / 60)}:{timer % 60}</p>}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SignUp;
