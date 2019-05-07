const passport = require("passport");
const express = require("express");
const router = express.Router();

const title = "Ericka y David - Invitados";

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("guests");
  res.render("login", { title });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/guests",
    failureRedirect: "/login"
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
