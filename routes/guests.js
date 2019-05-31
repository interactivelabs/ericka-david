const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");
const guestClient = new GuestClient();
const { secure } = require("../lib/route-middleware");

const title = "Ericka y David - Invitados";

router.get("/guests", secure, (req, res) => res.render("guests", { title }));

router.get("/api/guests", secure, async (req, res) => {
  const result = await guestClient.getAllGuests();
  return res.send(result);
});

router.post("/api/guests", secure, async (req, res) => {
  const { body } = req;
  const result = await guestClient.addGuest(body);
  return res.send(result);
});

router.delete("/api/guests/:guestid", secure, async (req, res) => {
  const { guestid } = req.params;
  const result = await guestClient.deleteGuest(guestid);
  return res.send(result);
});

router.get("/api/guests", async (req, res) => {
  const { name } = req.query;
  const result = await guestClient.searchGuest(name);
  return res.send(result);
});

module.exports = router;
