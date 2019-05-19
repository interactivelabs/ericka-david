const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const logger = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const guestsRouter = require("./routes/guests");

const { expiryDate } = require("./lib/route-middleware");

const app = express();

const key01 = process.env.ERICKA_KEY_01;
const key02 = process.env.ERICKA_KEY_02;
const user = process.env.ERICKA_USER;
const pwd = process.env.ERICKA_PWD;

const session = cookieSession({
  name: "session",
  keys: [key01, key02],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: "localhost",
    expires: expiryDate
  }
});

passport.use(
  new Strategy((username, password, done) => {
    if (username !== user || password !== pwd) {
      return done({ msg: "Incorrect username or password" }, null);
    }
    return done(null, { level: "admin", id: 1 });
  })
);
passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => cb(null, { level: "admin", id }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/img", "favicon.ico")));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(indexRouter);
app.use(guestsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
