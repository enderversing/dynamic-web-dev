# Week 4

I truly went through quite the journey trying to complete this week's homework. My [Git history](https://github.com/enderversing/dynamic-web-dev/commits/main/project4) reveals that I was up quite late (and early) trying to create an open source yet private (only usable for my URLs, by using [CORS](https://expressjs.com/en/resources/middleware/cors.html)) version of [OpenGraphPlus](https://opengraphplus.com/). 

I saw that link on a developer website earlier in the week (probably [this one](https://daily.dev/)) and thought I could make it myself. I was wrong - or at least too ambitious for this deadline.

At first, I just made basic syntax errors attempting to make `fetch` requests from the og image API.

```js
// forgot port number for week 4
  const pageUrl = "https://enderverse.org";
  let encoded = encodeURI(pageUrl);
  const response = await fetch(
    `http://ip:2190/?=${encoded}`,
  );
```

```js
// forgot query pageUrl for week 4
const pageUrl = "https://enderverse.org";
let encoded = encodeURI(pageUrl);
const response = await fetch(
    `http://ip:2190/?pageUrl=${encoded}`,
);
```

Eventually, I realized that headless browsers are slow. The server was a problem. I could not fix the server. I don't know why, but I couldn't make the headless browsers fast enough - neither [puppeteer](https://pptr.dev/) nor [playwright](https://playwright.dev/docs/browsers) - to finish the og image API.

In this code, I never even made it to ` console.log(page)`. The `page.goto` function would not stop running.

```js
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
 }
```
I assumed that the line `let screenshot = await page.screenshot({ type: "png" });` would cause issues, but I never even got there.

Near the end, I just copied from the [in-class example](https://github.com/samheckle/dynamic_web_development_sp_26/tree/main/week4) almost word for word so I could make the homework deadline. It's a simple book recommendation API. I hope you've been reading some nice books lately?
