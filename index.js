require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const noCache = require("nocache");
const logger = require("morgan");
const { process_checkout_session } = require("./server/controllers/stripe");

const app = express();
app.use(cors());
app.use(logger("dev"));
// helmet security
app.use(noCache());
app.use(helmet());

// adding custom settings for middleware of upload image routes
app.use("/projects/:id/upload_image", express.json({ limit: "50mb" }));
app.use("/projects/:id/upload_image", express.urlencoded({ extended: "true" }));

// adding the stripe web book first because it should stay unaffected by other middleware
app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  process_checkout_session
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes
const authRouter = require("./server/routes/auth");
const projectsRouter = require("./server/routes/projects");
const usersRouter = require("./server/routes/users");
const stripeRouter = require("./server/routes/stripe");

//  routes

app.use("/auth", authRouter);
app.use("/projects", projectsRouter);
app.use("/users", usersRouter);

const connect = async () => {
  // database connection
  const SERVER_PORT = process.env.PORT || 5000;
  const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/";
  const MONGO_CONFIG = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URL, MONGO_CONFIG);
    console.log("Successfully connected MongoDB!");
  } catch (err) {
    console.log("Mongoose error", err);
  }
  // start express server
  app.listen(SERVER_PORT);
  console.log(`Server listening on ${SERVER_PORT}`);
};

connect();
