require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const async = require("async");
const User = require("../models/user");
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

// note to self: this is way too long, find a way to split this into 2 (tella)
exports.google_login = async (req, res) => {
  const { email, username } = req.body;
  let errors = [];
  // check if any of the following properties are empty
  if (!username || !email)
    errors.push({ msg: "Username or email are missing." });
  console.log(email);
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      // check if e-mail is already taken
      const userWithSameEmail = await User.findOne({
        email: emailLowerCase,
      }).populate("projectsOwned projectsSupported");
      // if user already exists, just return login success and do not register the user to the database
      if (userWithSameEmail) {
        //////////////////// LOGIN ////////////////////
        // variable reassignment to make it more readable
        const user = userWithSameEmail;
        // user object to be used for token
        const userForToken = {
          username: user.username,
          id: user._id.toString(),
        };
        // synchronous signing of JWT token
        const token = jwt.sign(userForToken, JWT_SECRETKEY, {
          // TTL so it expires around 8 hours, and does not stay forever
          expiresIn: 28800,
        });

        // this will be the user returned to the frontend
        const responseUserObject = {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          projectsOwned: user.projectsOwned || [],
          projectsSupported: user.projectsSupported || [],
        };
        //return JSON object to the frontend
        res.status(200).json({
          token,
          user: responseUserObject,
        });
      }
      // go through the registration process, to add the user to the database
      else {
        ////////////////////REGISTRATION////////////////////
        // create a new user mongoose
        const newUser = new User({
          email: emailLowerCase,
          username,
        });
        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Failed to register the user.");
        // user object to be used for token
        const userForToken = {
          username: savedUser.username,
          id: savedUser._id.toString(),
        };

        // synchronous signing of JWT token
        const token = jwt.sign(userForToken, JWT_SECRETKEY, {
          // TTL so it expires around 8 hours, and does not stay forever
          expiresIn: 28800,
        });

        // this will be the user returned to the frontend
        const responseUserObject = {
          id: savedUser._id.toString(),
          username: savedUser.username,
          email: savedUser.email,
          projectsOwned: [],
          projectsSupported: [],
        };
        //return JSON object to the frontend
        res.status(200).json({
          token,
          user: responseUserObject,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

// retrieve user information upon application loading
exports.user_load = async (req, res) => {
  console.log("loading user");
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("projectsOwned projectsSupported");
    if (!user) throw Error("User does not exist");
    res.status(200).json({
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        projectsOwned: user.projectsOwned || [],
        projectsSupported: user.projectsSupported || [],
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);
  let errors = [];

  // check if any of the following fields are empty
  if (!email || !username || !password) {
    errors.push({ msg: "Please fill in all the fields." });
  }

  // minimum length for the password
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    try {
      const emailLowerCase = email.toLowerCase();
      // Check if username is already taken
      const userWithSameEmail = await User.findOne({
        email: emailLowerCase,
      });
      if (userWithSameEmail) throw Error("Email is already taken.");
      // check if salt generation has any errors
      const salt = await bcrypt.genSalt(10);
      if (!salt)
        throw Error("Something went wrong with encrypting the password.");
      // check if hashing the password has any errors
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error("Something went wrong hashing the password.");
      console.log(JWT_SECRETKEY);

      // create new user object in mongoose
      const newUser = new User({
        email: emailLowerCase,
        username,
        password: hash,
      });
      const savedUser = await newUser.save();
      if (!savedUser) throw Error("Failed to register the user.");

      // user object to be used for token
      const userForToken = {
        username: savedUser.username,
        id: savedUser.id,
      };
      // synchronous signing of JWT token
      const token = jwt.sign(userForToken, JWT_SECRETKEY, {
        // TTL so it expires around 8 hours, and does not stay forever
        expiresIn: 28800,
      });

      // this will be the user returned to the frontend
      const responseUserObject = {
        id: savedUser.id.toString(),
        username: savedUser.username,
        email: savedUser.email,
        projectsOwned: [],
        projectsSupported: [],
      };
      //return JSON object to the frontend
      res.status(200).json({
        token,
        user: responseUserObject,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: e.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter an input for all fields." });
  }

  try {
    const emailLowerCase = email.toLowerCase();
    // Check for existing user
    const user = await User.findOne({ email: emailLowerCase }).populate(
      "projectsOwned projectsSupported"
    );
    if (!user)
      throw Error("User does not exist. Please register for an account.");

    console.log(password);
    console.log(user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials.");

    // user object to be used for token
    const userForToken = {
      username: user.username,
      id: user.id,
    };
    // synchronous signing of JWT token
    const token = jwt.sign(userForToken, JWT_SECRETKEY, {
      // TTL so it expires around 8 hours, and does not stay forever
      expiresIn: 28800,
    });

    // this will be the user returned to the frontend
    const responseUserObject = {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      projectsOwned: user.projectsOwned || [],
      projectsSupported: user.projectsSupported || [],
    };
    //return JSON object to the frontend
    res.status(200).json({
      token,
      user: responseUserObject,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};
