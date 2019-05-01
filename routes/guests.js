const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");
const env = process.env.NODE_ENV || "development";
const guestClient = new GuestClient();

router.get("/guests", (req, res) => {
  res.render("guests", { title: "Ericka y David - Invitados", env: env });
});

router.get("/api/guests/:name", async (req, res) => {
  const { guest } = req.body;
  const result = await guestClient.searchGuest(guest);
  return res.send(result);
});

router.post("/api/guest", () => {
  // Create new guest;
});

// Implement csrf
router.post("/api/guests/confirm", async (req, res) => {
  const { guestId } = req.body;
  const result = await guestClient.confirm(guestId);
  return res.send(result);
});

module.exports = router;
