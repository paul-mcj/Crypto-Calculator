# Crypto Calculator (v1.0.6)

## About this project

### Recent Update: Jan 2025

v2.0 is the most recent update, mainly made to fix the visual styling as
previous version was black and white only and made it unappealing and difficult
to read content. Current version is more appealing and has a nicer background
image which was designed by
[Freepik](https://www.freepik.com/free-ai-image/3d-rendering-blockchain-technology_196469723.htm#fromView=search&page=1&position=7&uuid=aa1defe3-d150-4b0e-92e3-89c6684b8358&new_detail=true&query=crypto).

### What does it do?

By using the Coinbase API, users get to choose an amount of money in fiat
currency (there are about 7 total currencies to choose from) and a crypto
currency of their choice (of which there are four). The application will
calculate how many coins the amount of fiat currency is worth.

### Why do it?

After learning about the XMLHttpRequest object, I decided I wanted to make a
small application that integrates with an API by gathering real-time data. After
a few versions, it was updated to use the Fetch API instead of XHR.

I choose a crypto API since I find crypto to be an interesting topic, but also
because my best friends loves crypto and I wanted to make him something he could
use from all of the web development knowledge I have accumulated!

## Challenges and what I learned

I knew immediately that this project was not going to be a platform to exchange,
convert, but or sell currency. But, I knew that it was possible to gather data
through an API and so something with it. That being said, this smaller-sized
application still has a few challenges:

-    Through some research, I realized that an <input> element in html should
     have a "for" attribute the exact same as the related element in order to
     properly bind them together. This was needed specifically for some JS query
     selection, to make sure values were properly gathered for processing.
-    I started to really understand the importance of other attributes, too like
     why its nice to have a "type = number" attribute for an <input> tag that
     should be immediately taking in a numbered value -- it helps with UX/UI a
     lot!
-    I learnt how to apply multiple cases to a single outcome in a switch/case
     statement. This helps make it look a lot nicer for something like returning
     the same symbol for both Chinese yeun and Japanese yen:

```js
case "eur":
    symbol = "\u20ac";
    break;
case "jpy":
case "cny":
    symbol = "\u00a5";
    break;
```

-    I also had a bit of trouble getting the correct response data back from the
     API. After some trial-and-error, I found that I wasn't properly referencing
     the variable. I wouldn't return a valid value with:

```js
let newAmount = Number(data.amount * amount).toFixed(2);
```

-    But I did with this:

```js
let newAmount = Number(data.data.amount * amount).toFixed(2);
```

-    I also did some basic research to figure out how to add some commas in the
     returned value if it larger than 1000 fiat. It was a returned amount
     combined with a regular expression:

```js
numberWithCommas = (amount) =>
	amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
```

## Conclusions

This app was a lot of fun and it took me a few days to make. I'm glad I was able
to use my knowledge of Fetch API and apply it to something real! I'm excited to
apply my knowledge to bigger and better projects in the future :)

## Author

-    My Website: [paulmcjannet.com](https://www.paulmcjannet.com/)
-    LinkedIn: [Paul McJannet](www.linkedin.com/in/paul-mcjannet)
-    Github Profile: [paul-mcj](https://github.com/paul-mcj/)
