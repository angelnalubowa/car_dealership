
// Import your CSS file

function Login() {
  return (
    <div>
        <h1>Log In</h1>
        <p2>Please enter your details here</p2>
    <div className="Login-container">
    <div className="Login-card">
    <div className="login-page">
      <div className="input-fields">
        <input type="email" placeholder="Enter you email" />
        <input type="password" placeholder="Enetr your password" />
      </div>

      <div className="checkboxes">
        <label>
          <input type="checkbox" /> Remember Me
        </label>
        <label>
          <input type="checkbox" /> Forgot Password
        </label>
      </div>

      <button className="login-button">Login</button>
      <div className="already-have-account">
        Do not have an account? <a href="/Signup">Sign Up</a>
      </div>
      <div className="divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>
      <div className="api-options">
        <button className="google-api-button"> Signup with Google</button>
        <button className="facebook-api-button">Signup with Facebook</button>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
