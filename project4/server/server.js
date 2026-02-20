const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");
const url = require("url");
let app = express();

let corsOptions = {
  origin: [
    // not sure whether I should use HTTPS or HTTP.
    "http://enderverse.org",
    "http://enderverse.site",
    "http://enderverse.work",
    "http://enderminyard.com",
    "http://harrietnetwork.com",
    "http://enderminyard.github.io",
    "http://enderversing.github.io",
    "https://enderverse.org",
    "https://enderverse.site",
    "https://enderverse.work",
    "https://enderminyard.com",
    "https://harrietnetwork.com",
    "https://enderminyard.github.io",
    "https://enderversing.github.io",
  ], //enderverse only <3
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let browser;

let launch = async () => {
  browser = await chromium.launch({
    headless: true,
  });
};

launch();

app.get("/", async (req, res) => {
  let { pageUrl } = req.query;

  if (!pageUrl) {
    return res.status(400).json({ error: "pageUrl required." });
  }

  try {
    let page = await browser.newPage();

    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(pageUrl);

    let screenshot = await page.screenshot({ type: "png" });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("Content-Length", screenshot.length);

    res.send(screenshot);

    await page.close();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(2190, () => {
  // Ender Wiggin was born the year of 2190 BX 🎉
  console.log("Server running on port 2190 ⚙️🔩");
});
