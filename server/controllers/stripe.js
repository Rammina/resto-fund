require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const STRIPE_SECRETKEY = process.env.STRIPE_SECRETKEY;
const stripe = require("stripe")(STRIPE_SECRETKEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const updateDonorSupportedProjects = async (userId, projectId) => {
  const donor = await User.findById(userId);
  // .populate("projectsSupported");
  if (!donor) throw Error("Unable to find the donor.");
  // check if project is already added to supported projects, if not, add it
  let projectIsListedAsSupported = false;
  for (let supportedProject of donor.projectsSupported) {
    if (supportedProject == projectId) projectIsListedAsSupported = true;
  }
  if (!projectIsListedAsSupported) donor.projectsSupported.push(projectId);
  await donor.save();
};

const updateProjectAmountDonated = async (project, amount) => {
  // update the project to increase its amount_donated value
  //  guards against numbers that are of type string, convert to numbers first before adding
  project.amount_donated = Number(project.amount_donated) + Number(amount);
  // change the status of the project if target goal has been reached
  if (project.amount_donated >= project.target_goal) {
    project.status = "completed";
  }
  await project.save();
};

const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);
  const { metadata } = session;
  const { userId, projectId, projectCreatorId, amount } = metadata;
  // if the user is registered and logged in (not anonymous donor), update the user
  if (userId) {
    updateDonorSupportedProjects(userId, projectId);
  }
  const project = await Project.findById(projectId);
  if (!project) throw Error("Unable to find that project.");
  updateProjectAmountDonated(project, amount);
};

exports.process_checkout_session = (request, response) => {
  const payload = request.body;
  // used to verify that the request came from stripe
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      // Fulfill the purchase...
      fulfillOrder(session);
    } catch (err) {
      console.log(err);
      return response.status(400).send(err);
    }
  }

  response.status(200);
};
