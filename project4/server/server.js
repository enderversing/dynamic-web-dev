const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");
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

// app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  let pageUrl = req.query.pageUrl;
  console.log(pageUrl);

  if (!pageUrl) {
    return res.status(400).json({ error: "pageUrl required." });
  }

  try {
    console.log("inside here!");
    const browser = await chromium.launch();
    console.log("we launched!");
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(pageUrl);

    console.log(page);

    let screenshot = await page.screenshot({ type: "png" });

    console.log(screenshot);

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
