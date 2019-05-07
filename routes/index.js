const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");

const guestClient = new GuestClient();

const title = "Ericka y David - Julio 20 2019";

router.get("/", (req, res) => {
  res.render("index", { title });
});

router.get("/rsvp/:guestId?", async (req, res) => {
  let result = {};
  const { guestId } = req.params;
  if (guestId) {
    result = await guestClient.confirm(guestId);
  }
  return res.render("rsvp", {
    title,
    guest: result.guest
  });
});

module.exports = router;
