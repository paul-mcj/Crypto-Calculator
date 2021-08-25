const form = document.querySelector(".form");
const cryptoAmount = document.querySelector("#crypto-amount");
const cryptoType = document.querySelector("#crypto-type");
const fiatCurrency = document.querySelector("#fiat-currency");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const serverTime = document.querySelector(".server-time");

form.addEventListener("submit", function (event) {
    getPrice();
    event.preventDefault();
});

submit.addEventListener("click", getPrice);

function getPrice() {
    let amount = cryptoAmount.value;
    let crypto = cryptoType.value;
    let fiat = fiatCurrency.value;
    if (amount <= 0 || isNaN(amount)) {
        window.alert("Amount must be greater than 0. Try again!");
    } else {
        fetch(`https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let newAmount = Number(data.data.amount * amount).toFixed(2);
                function numberWithCommas(amount) {
                    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                let symbol;
                switch (fiat) {
                    case "gbp":
                        symbol = "\u00a3";
                        break;
                    case "eur":
                        symbol = "\u20ac";
                        break;
                    case "jpy":
                        symbol = "\u00a5";
                        break;
                    case "cny":
                        symbol = "\u00a5";
                        break;
                    default:
                        symbol = "\u0024";
                        break;
                }
                processingData();
                setTimeout(revealingData, 3000);
                result.textContent = `${amount} ${crypto.toUpperCase()} is worth ${symbol}${numberWithCommas(
                    newAmount
                )} in ${fiat.toUpperCase()}`;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    cryptoAmount.value = "";
}

function processingData() {
    loader.style.display = "block";
    submit.style.display = "none";
    result.style.display = "none";
    serverTime.textContent = `Fetching data from server...`;
}

function revealingData() {
    loader.style.display = "none";
    submit.style.display = "block";
    result.style.display = "block";
    getServerTime();
}

function getServerTime() {
    fetch("https://api.coinbase.com/v2/time")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            serverTime.textContent = `Data retrieved from server at ${data.data.iso}`;
        })
        .catch(function (error) {
            console.log(error);
        });
}
