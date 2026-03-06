const express = require("express");
const { randomInt } = require("node:crypto");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const nedb = require("@seald-io/nedb");
const nedbSessionStore = require("nedb-promises-session-store");
let app = express();
express.urlencoded({ extended: true });
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: "sessions.txt",
});

app.use(
  expressSession({
    store: nedbSessionInit,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // after a year, delete the session
    },
    secret: "fake-secret-for-you",
  }),
);

app.use(express.static("public"));
app.use(cookieParser());

let userdb = new nedb({
  filename: "userdb.txt",
  autoload: true,
});

app.post("/new-session", (req, res) => {
  console.log("headers are", req.headers);
  console.log("body is", req.body);
  const pin = randomInt(10 ** 7 + 1, 10 ** 8);
  let newUser = {
    pin: pin,
  };

  userdb.insert(newUser, (err, insertedData) => {
    res.redirect(`/app.html?pin=${pin}`);
  });
});

app.post("/retrieve-session", (req, res) => {
  console.log("headers are", req.headers);
  console.log("body is", req.body);

  let loginAttempt = {
    pin: req.body.pin,
  };

  userdb.findOne(loginAttempt, (err, foundUser) => {
    if (foundUser) {
      let session = req.session;
      session.pin = foundUser.pin;
      res.redirect(`/app?pin=${session.pin}`);
    } else {
      console.log(err);
      res.redirect("404.html");
    }
  });
});

app.listen(2140, () => {
  console.log("server is running");
});
