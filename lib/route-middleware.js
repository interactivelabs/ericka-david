const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24); // 24 hours

const secure = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

module.exports = { secure, expiryDate };
