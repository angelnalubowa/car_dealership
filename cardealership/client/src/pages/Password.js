import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Password.css";

function Password() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/validate-password", {
        password,
      });

      if (response.data.success) {
        navigate("/listing"); // Redirect to listings page on success
      }
    } catch (error) {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="password-page">
      <h1>Enter Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Unlock</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Password;
