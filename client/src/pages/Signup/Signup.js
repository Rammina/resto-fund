import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <p>Signup Page</p>
      <Link to="/">Home Page</Link>
      <Link to="login">Login Page</Link>
      <Link to="dashboard">Dashboard Page</Link>
      <Link to="signup">Signup Page</Link>
      <Link to="projectslist">ProjectsList</Link>
    </div>
  );
};

export default Signup;
