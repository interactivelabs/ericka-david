const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.render("index", { title: "Ericka y David - Inicio" });
});

router.get("/rsvp", function(req, res, next) {
  res.render("rsvp", { title: "Ericka y David - Confirma" });
});

module.exports = router;
