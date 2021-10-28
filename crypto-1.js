/*JS file for Crypto Calculator "index.html"*/

/******************************************************************************
	Table of Contents
	-----------------
	1. Global Variables

	2. Event Listeners
        2.1 -- form.addEventListener("submit", (event))
        2.2 -- submit.addEventListener("click", (event))

	3. Global Functions
        3.1 -- getPrice()
        3.2 -- processingData()
        3.3 -- revealingData()
        3.4 -- getServerTime()
        3.5 -- numberWithCommas()
        
*******************************************************************************/

/******************************************************************************
1. Global Variables
******************************************************************************/
const form = document.querySelector(".form");
const cryptoAmount = document.querySelector("#crypto-amount");
const cryptoType = document.querySelector("#crypto-type");
const fiatCurrency = document.querySelector("#fiat-currency");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const serverTime = document.querySelector(".server-time");

/******************************************************************************
2. Event Listeners
******************************************************************************/

// 2.1 This listens on the form element for a submission of user input, and calls the function getPrice() to output data.
form.addEventListener("submit", (event) => {
    getPrice();
    event.preventDefault();
});

// 2.2 A similar function of the above event listener is included here but occurs when the button is specifically clicked.
submit.addEventListener("click", (event) => getPrice(event));

/******************************************************************************
3. Global Functions
******************************************************************************/

// 3.1 This function performs the main logic of the app, including: gathering all user data, checking input is valid, fetching data from the API, processing the data, revealing the data, and resetting the input value.
function getPrice() {
    // gather user input values
    let amount = cryptoAmount.value;
    let crypto = cryptoType.value;
    let fiat = fiatCurrency.value;
    //check amount is a valid number
    if (amount <= 0 || isNaN(amount)) {
        window.alert("Amount must be greater than 0. Try again!");
    } else {
        //fetch data from the API, passing in user inputs to grab the exact conversion types
        fetch(`https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`)
            .then((response) => response.json())
            .then((data) => {
                // round the data to hundredth decimal places
                let newAmount = Number(data.data.amount * amount).toFixed(2);
                // if the newAmount is less than ten thousand it stays returned, otherwise it needs to call a function that separates larger returned values with commas for easier readability
                if (newAmount > 9999.99) {
                    newAmount = numberWithCommas(newAmount);
                }
                let symbol;
                // set the fiat symbol according to the user input
                switch (fiat) {
                    case "gbp":
                        symbol = "\u00a3";
                        break;
                    case "eur":
                        symbol = "\u20ac";
                        break;
                    case "jpy":
                    case "cny":
                        symbol = "\u00a5";
                        break;
                    default:
                        symbol = "\u0024";
                }
                processingData();
                //purposefully wait two seconds to return data for UI/UX (a loader animation is used in this timeframe)
                setTimeout(revealingData, 2000);
                //set the amount to be displayed on the webpage
                result.textContent = `${amount} ${crypto.toUpperCase()} = ${symbol}${newAmount} in ${fiat.toUpperCase()}`;
            })
            .catch((error) => console.log(error));
    }
    //reset the value input field
    cryptoAmount.value = "";
}

// 3.2 When this function is called the loader is shown while hiding the result amount and calculate button
processingData = () => {
    loader.style.display = "block";
    submit.style.display = "none";
    result.style.display = "none";
    serverTime.textContent = `Fetching data from server...`;
};

// 3.3 This removes the loader and displays the conversion result to the user
revealingData = () => {
    loader.style.display = "none";
    submit.style.display = "block";
    result.style.display = "block";
    getServerTime();
};

// 3.4  Fetches the API server time and displays it to the user so they know data is recent
getServerTime = () => {
    fetch("https://api.coinbase.com/v2/time")
        .then((response) => response.json())
        .then((data) => {
            let date = new Date(data.data.iso);
            serverTime.textContent = `Data retrieved from server ${date.toString()}`;
        })
        .catch((error) => console.log(error));
};

// 3.5 Converts an amount to a string, separating with commas
numberWithCommas = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
