
import { useState } from "react";

function CreateAccount() {
  const [userType, setUserType] = useState('Dean');

 /*const handleToggle = () => {
    setUserType((prevUserType) => (prevUserType === 'Dean' ? 'Custodian' : 'Dean'));
  };*/

  return (
    <div>
      <h1>Create an Account</h1>
    <div className="create-account-container">
    <div className="create-account-card">
  
    <div className="create-account-page">

      <div className="input-fields">
        <p1>Full Name</p1>
        <input type="text" placeholder="Enter name & surname" />
        <p1>Email Adress</p1>
        <input type="email" placeholder=" Enter your email" />
        <p1>Password</p1>
        <input type="password" placeholder="Enter your password" />
      </div>

      <button className="create-account-button">Create Account</button>

      <div className="already-have-account">
        Already have an account? <a href="/login">Log In</a>
      </div>

      <div className="divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div className="api-options">
        <button className="google-api-button">Sign Up with Google</button>
        <button className="facebook-api-button">Sign Up with Facebook</button>
      </div>
    </div>
    </div>
  </div>
  </div>
  );
}


export default CreateAccount;
