# Crypto Calculator (v1.0.7)

## About this project

### What does it do?

By using the Coinbase API, users get to choose an amount of money in fiat currency (there are about 7 total currencies to choose from) and a crypto currency of their choice (of which there are four). The application will calculate how many coins the amount of fiat currency is worth.

Additionally, it gathers the server time when a request us made to the API and displays it so that the user knows the result is accurate and recent

### Why do it?

After learning about the XMLHttpRequest object, I decided I wanted to make a small application that integrates with an API by gathering real-time data. After a few versions, it was updated to use the Fetch API instead.

I choose a crypto API since I find crypto to be an interesting topic, but also because my best friends loves crypto and I wanted to make him something he could use from all of the web development knowledge I have accumulated!

## Challenges and what I learned
- I learned how to properly link and use a CSS framework/boilerplate, in this case CSS [Skeleton](http://getskeleton.com/).
-   Through some research, I realized that in order to properly bind together an input element and its related element in html, the former should have a "for" attribute the exact same as the latter's "id" value.
-   I started to really understand the importance of other attributes aswell, like why its nice to have a "type = number" attribute for an input tag that should be immediately taking in a numbered value. I found this really helps with UX/UI particularily on mobile!
-   I learnt how to apply multiple cases to a single outcome in a switch/case statement. This helps make it look a lot nicer for something like returning the same symbol for both Chinese yeun and Japanese yen:

```js
case "eur":
    symbol = "\u20ac";
    break;
case "jpy":
case "cny":
    symbol = "\u00a5";
    break;
```

-   I also had a bit of trouble getting the correct response data back from the API. After some trial-and-error, I found that I wasn't properly referencing the variable. I wouldn't return a valid value with:

```js
let newAmount = Number(data.amount * amount).toFixed(2);
```

-   But I did with this:

```js
let newAmount = Number(data.data.amount * amount).toFixed(2);
```

-   I also did some basic research to figure out how to add some commas in the returned value if it larger than 1000 fiat. It was a returned amount combined with a regular expression:

```js
numberWithCommas = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
```

## Conclusions

This app was a lot of fun and it took me a few days to make. I'm glad I was able to use my knowledge of Fetch API and apply it to something real! I'm excited to apply my knowledge to bigger and better projects in the future :)

## Author

-   LinkedIn: [Paul McJannet](https://www.linkedin.com/in/paul-mcjannet)
-   Frontend Mentor: [@paul-mcj](https://www.frontendmentor.io/profile/paul-mcj)
-   Github: [paul-mcj](https://github.com/paul-mcj)
