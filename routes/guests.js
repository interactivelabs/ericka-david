const express = require("express");
const router = express.Router();
const GuestClient = require("../lib/guest-client");
const mailClient = require("../lib/mailClient");
const { secure } = require("../lib/route-middleware");

const guestClient = new GuestClient();
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

router.get("/api/campaign/send", secure, async (req, res) => {
  const campaignId = process.env.SENDGRID_CAMPAIGN;
  const result = await mailClient.sendCampaign(campaignId);
  return res.send(result);
});

router.get("/api/guests", async (req, res) => {
  const { name } = req.query;
  const result = await guestClient.searchGuest(name);
  return res.send(result);
});

const confirmHanlder = async (req, res) => {
  let code = req.body.code;
  let guest = { notFound: true };
  if (!code) code = req.params.code;
  if (code) {
    const result = await guestClient.getGuest(code);
    if (result) {
      guest = result;
    }
  }
  return res.render("confirm", {
    title,
    guest
  });
};

router.get("/confirm/:code", confirmHanlder);
router.post("/confirm", confirmHanlder);

router.get("/confirm_final/:code", async (req, res) => {
  const { code } = req.params;
  await guestClient.confirm(code);
  return res.redirect(`/confirm/${code}`);
});

module.exports = router;
