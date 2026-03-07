import express from "express";
import { randomInt } from "node:crypto";
import expressSession from "express-session";
import nedb from "@seald-io/nedb";
import nedbSessionStore from "nedb-promises-session-store";
import multer from "multer";
let app = express();

const sessionStore = nedbSessionStore({
  connect: expressSession,
  defaultExpiry: 1000 * 60 * 60 * 24,
  filename: "sessions.txt",
});

let genID = () => {
  return randomInt(10 ** 7 + 1, 10 ** 8).toString();
};

app.use(
  expressSession({
    genid: genID,
    store: sessionStore,
    secret: "a-secret-for-you",
    resave: true,
    saveUninitialized: false,
  }),
  express.static("public"),
  express.urlencoded({ extended: true }),
);

const upload = multer({ storage: multer.memoryStorage() });

app.post("/new-session", upload.array("snippets"), async (req, res) => {
  let session = req.session;

  let sentfiles = [];

  if (req.files && req.files.length) {
    for (const file of req.files) {
      sentfiles.push({
        name: file.originalname,
        data: file.buffer.toString("base64"),
      });
    }
  }
  session.files = sentfiles;
  res.redirect(`/app/index.html?pin=${session["id"]}`);
});

app.post("/retrieve-session", async (req, res) => {
  sessionStore.get(req.body.pin, async (err, foundUser) => {
    if (foundUser) {
      res.redirect(`/app/index.html?pin=${req.body.pin}`);
    } else {
      console.log(err);
      console.log("unable to redirect");
      res.redirect("404.html");
    }
  });
});

app.post("/get-canvas", async (req, res) => {
  sessionStore.get(req.query.pin, async (err, foundUser) => {
    if (foundUser) {
      let session = req.session;
      session._id = foundUser._id;
      session.files = foundUser.files;
      res.type("json").send(session.files);
    } else {
      console.log("no files retrieved");
    }
  });
});

app.listen(2140, () => {
  console.log("server is running");
});
