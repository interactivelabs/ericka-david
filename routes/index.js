const express = require("express");
const router = express.Router();
const guestClient = require("../data/guest-client");

router.get("/", (req, res) => {
  res.render("index", { title: "Ericka y David - Inicio" });
});

router.get("/rsvp/:guestId", async (req, res) => {
  const { guestId } = res.params;
  if (guestId) {
    const result = await guestClient.confirm(guestId);
  }
  return res.render("rsvp", {
    title: "Ericka y David - Confirma",
    guest: result.guest
  });
});

router.get("/api/guests/:name", (req, res) => {
  // Search Guest
  const { guest } = req.body;
  const result = await guestClient.createGuest(guest);
  return res.send(result);
});

router.post("/api/guest", () => {
  // Create new guest;
})

// Implement csrf
router.post("/api/guests/confirm", (req, res) => {
  const { guestId } = req.body;
  const result = await guestClient.confirm(guestId);
  return res.send(result);
});

module.exports = router;
