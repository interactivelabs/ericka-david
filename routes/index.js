const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");

const guestClient = new GuestClient();

router.get("/", (req, res) => {
  res.render("index", { title: "Ericka y David - Inicio" });
});

router.get("/rsvp/:guestId?", async (req, res) => {
  let result = {};
  const { guestId } = req.params;
  if (guestId) {
    result = await guestClient.confirm(guestId);
  }
  return res.render("rsvp", {
    title: "Ericka y David - Confirma",
    guest: result.guest
  });
});

module.exports = router;
