import express from "express";
import { randomInt } from "node:crypto";
import expressSession from "express-session";
import nedb from "@seald-io/nedb";
import nedbSessionStore from "nedb-promises-session-store";
import multer from "multer";
import { createHelia } from "helia";
import { json } from "@helia/json";
import { CID } from "multiformats/cid";
let app = express();

const sessionStore = nedbSessionStore({
  connect: expressSession,
  defaultExpiry: 1000 * 60 * 60 * 24,
  filename: "sessions.txt",
});

let genID = () => {
  return randomInt(10 ** 7 + 1, 10 ** 8).toString();
};

let expressSes = expressSession({
  genid: genID,
  store: sessionStore,
  secret: "a-secret-for-you",
  resave: false,
  saveUninitialized: false,
});

app.use(
  expressSes,
  express.static("public"),
  express.urlencoded({ extended: true }),
);

const upload = multer({ storage: multer.memoryStorage() });

app.post("/new-session", upload.array("snippets"), async (req, res) => {
  const helia = await createHelia();
  const j = json(helia);

  let session = req.session;

  let ipfs_files = {};

  if (req.files && req.files.length) {
    for (const file of req.files) {
      ipfs_files[file.originalname] = {
        data: file.buffer.toString("base64"),
      };
    }
  }
  const myImmutableAddress = await j.add(ipfs_files);
  session.files = myImmutableAddress.toString();
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
  const helia = await createHelia();
  const j = json(helia);

  sessionStore.get(req.query.pin, async (err, foundUser) => {
    if (foundUser) {
      let session = req.session;
      session._id = foundUser._id;
      session.files = foundUser.files;
      let ipfs_cid = session.files;
      res.send(ipfs_cid);
    } else {
      console.log("no CID retrieved");
    }
  });
});

app.listen(2140, () => {
  console.log("server is running");
});
