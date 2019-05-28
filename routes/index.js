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

const confirmHanlder = async (req, res) => {
  let code = req.body.code;
  let result = { notFound: true };
  if (!code) {
    code = req.params.code;
  }
  if (code) {
    result = await guestClient.confirm(code);
  }
  return res.render("confirm", {
    title,
    guest: result,
    notFound: result.notFound
  });
};

router.get("/confirm/:code", confirmHanlder);
router.post("/confirm", confirmHanlder);

module.exports = router;
