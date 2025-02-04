import { Link } from "react-router-dom";
import image1 from "../Images/background-image.jpg";
// import "../App.css";

import "./home.css"

function Home() {
  return (
    <div className="body">
    <div className="App">
      {/* <div className="background-image"> */}
        {/* <div>
          <img src={image1} alt="" />
        </div> */}
        <div className="container">
          <h1 className="title">Drive<span>Mo</span> Management System</h1>
          <p className="slogan">
            The easiest and quickest way to keep records of your sales using a database.
          </p>
        
          <Link to="/password" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
