const express = require("express");
const multer = require("multer");
const app = express();

app.use(express.static("client"));
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "client/upload" });

let lastImageUploaded = {};
app.post("/upload", upload.single("blob"), (request, response) => {
  console.log(request.file);
  lastImageUploaded.caption = request.body.filename;
  lastImageUploaded.src = `upload/${request.file.filename}`;

  response.send("thanks");
});
app.listen(5003, () => {
  console.log("Server is running on port 5003.");
});

app.get("/image", (request, response) => {
  console.log(lastImageUploaded.src);
  response.send(`<img src=${lastImageUploaded.src}>`);
});
