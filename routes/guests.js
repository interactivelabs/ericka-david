const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");
const env = process.env.NODE_ENV || "development";
const guestClient = new GuestClient();

router.get("/guests", (req, res) => {
  res.render("guests", { title: "Ericka y David - Invitados", env: env });
});

router.get("/api/guests", async (req, res) => {
  const result = await guestClient.getAllGuests();
  return res.send(result);
});

router.get("/api/guests/:name", async (req, res) => {
  const { name } = req.params;
  const result = await guestClient.searchGuest(name);
  return res.send(result);
});

router.post("/api/guests", async (req, res) => {
  const { body } = req;
  const result = await guestClient.addGuest(body);
  return res.send(result);
});

// Implement csrf
router.post("/api/guests/confirm", async (req, res) => {
  const { guestId } = req.body;
  const result = await guestClient.confirm(guestId);
  return res.send(result);
});

module.exports = router;
