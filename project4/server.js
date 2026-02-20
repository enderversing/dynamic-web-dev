const express = require("express");
let app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let books = [
  `On Earth We're Briefly Gorgeous`,
  `East of Eden`,
  `Sweet Thursday`,
  `Cannery Row`,
  `Dandelion Wine`,
  `Contact`,
  `Braiding Sweetgrass`,
  `all about love`,
  `Utopia in Performance`,
  `Straight Korean Female Fans and Their Gay Fantasies`,
];

app.get("/test", (request, response) => {
  response.send("<h1>Ender's server is live!</h1>");
});

app.post("/rec", (request, response) => {
  console.log(request.body);

  books.push(request.body.message);

  response.send("<h1>thanks for reading!</h1>");
});

app.get("/hi", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.get("/all-books", (req, res) => {
  res.json(books);
});

app.listen(8000, () => {
  console.log("Ender's server is working");
});
