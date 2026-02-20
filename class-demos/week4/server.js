const express = require("express");
const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({ extended: true });
const app = express();
app.use(parser);
let messages = [];
// app.use(express.static("public"));

app.get("/", (request, response) => {
  response.send("<h1> server is working. </h1>");
});

app.get("/test", (request, response) => {
  response.send("<h1> My server is live! </h1>");
});

app.post("/sign", (request, response) => {
  console.log(request.body);
  response.send("Thank you for signing!");
  messages.push({
    guest: request.body.name,
    msg: request.body.message,
  });
});

app.get("/all-messages", (req, resp) => {
  response.send(messages);
});

app.listen(5001, () => {
  console.log("server is running!");
});
