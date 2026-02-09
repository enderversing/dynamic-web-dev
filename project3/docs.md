# Week 3 Documentation

I [made my own API for a previous class](https://enderversing.github.io/itp-blog/year/2025/fall/undnet/weeks/week10.html), so I'm going to build on that work in this assignment.

My previous documentation contains this example, which I need to convert to a JavaScript fetch request:

```bash
# Filter by minimum cash award (> 200)
curl -s "https://starling.directory/api/filter?cashAward=200"
```

Let me think. That would be, roughly:

```javascript

let userSupplied = document.getElementById("amount").value;

let params = new URLSearchParams({
  cashAward: userSupplied
});

let url = "https://starling.directory/api/filter?" + params;

let response = await fetch(url); // this must be inside an async function

let jsonData = await response.json() //Display this data!

```

That's the core logic, if you will. Everything else is just styling to make the webpage look better.

My only other thought is that I need to make sure the `userSupplied` variable is a number and [contains no code that could harm my server](https://owasp.org/www-community/attacks/xss/). 

In my HTML, I can say:

```html
<!DOCTYPE html>
<html>
<head>
<link href="index.css" rel="stylesheet">
</head>
<body>
    <input type="number" id="amount" placeholder="How much money do you need?"></input>
    <script src="index.js"></script>
</body>
</html>
```

I hope the browser's built-in user input validation is enough!

(I prefer adding JavaScript to the body tag, not the head tag. I care a lot about [performance](https://dev.to/ender_minyard/the-ultimate-guide-to-web-performance-ci4).)


--- 

If this page ends up being displayed as HTML, it will be because I used a [Markdown to HTML converter](https://markdowntoword.net/markdown-to-html). 

(I am providing documentation about my documentation.)
