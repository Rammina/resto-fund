require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRETKEY);
    console.log("from line seventeen");
    console.log(decoded);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
