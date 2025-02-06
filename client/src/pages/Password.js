import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Password.css";
import { FaLock } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import image1 from "../Images/profile.jpeg";

function Password() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === "octopus8Rosette.") {
      navigate("/listing"); // Redirect to listings page if password is correct
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="password-page">
      <div className="cardcontainer">
        <h2>Enter your password</h2>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="background-image">
            <img src={image1} alt="User Profile" className="profile-image" />
          </div>
          <div>
            <p className="account-type">Business Account</p>
            <p className="user-name">
              DRIVE<span>MO</span>
            </p>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>

          {/* Stay Signed In */}
          <div className="stay-signed-in">
            <input
              type="checkbox"
              id="staySignedIn"
              checked={staySignedIn}
              onChange={() => setStaySignedIn(!staySignedIn)}
            />
            <label htmlFor="staySignedIn">Stay signed in</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="continue-btn">Continue</button>
        </form>

        {/* Reset Password Link */}
        <p className="reset-password">Reset password</p>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Password;
