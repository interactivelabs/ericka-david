const express = require("express");
const router = express.Router();

const title = "Ericka y David - Julio 20 2019";

router.get("/", (req, res) => res.render("index", { title }));

router.get("/rsvp", (req, res) =>
  res.render("rsvp", {
    title
  })
);

module.exports = router;
