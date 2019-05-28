const express = require("express");
const router = express.Router();
const GuestClient = require("../data/guest-client");

const guestClient = new GuestClient();

const title = "Ericka y David - Julio 20 2019";

router.get("/", (req, res) => res.render("index", { title }));

router.get("/rsvp", (req, res) =>
  res.render("rsvp", {
    title
  })
);

const confirmHanlder = async (req, res) => {
  let code = req.body.code;
  let guest = { notFound: true };
  if (!code) code = req.params.code;
  if (code) {
    const result = await guestClient.confirm(code);
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

module.exports = router;
