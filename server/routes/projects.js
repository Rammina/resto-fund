require("dotenv").config();
const express = require("express");
const router = express.Router();
const STRIPE_SECRETKEY = process.env.STRIPE_SECRETKEY;
const stripe = require("stripe")(STRIPE_SECRETKEY);

const {
  get_all_projects,
  get_project,
  create_project,
  cancel_project,
  edit_project,
  upload_image,
  delete_project,
} = require("../controllers/projects");

router.get("/", get_all_projects);
router.get("/:id", get_project);
router.post("/", create_project);
router.patch("/:id/cancel", cancel_project);
router.patch("/:id/edit_project", edit_project);
router.patch("/:id/upload_image", upload_image);
router.delete("/:id", delete_project);

// note: remember to move this controller function to the controller folder on project.js
router.post("/:id/create-checkout-session", async (req, res) => {
  const { amount, projectId, projectCreatorId, userId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation to Fundraiser",
          },
          /*this is necessary because in stripe, units are in cents*/
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // customer related stuff
    client_reference_id:
      userId ||
      Math.random().toString(36).substring(7) + projectId + projectCreatorId,
    metadata: { projectId, projectCreatorId, userId, amount },
    success_url: `https://resto-fund.netlify.app/projects/${projectId}?checkoutStatus=success`,
    cancel_url: `https://resto-fund.netlify.app/projects/${projectId}?checkoutStatus=canceled`,
  });

  res.status(200).json({ id: session.id });
});

module.exports = router;
