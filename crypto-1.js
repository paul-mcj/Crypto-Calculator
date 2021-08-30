const form = document.querySelector(".form");
const cryptoAmount = document.querySelector("#crypto-amount");
const cryptoType = document.querySelector("#crypto-type");
const fiatCurrency = document.querySelector("#fiat-currency");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const serverTime = document.querySelector(".server-time");

form.addEventListener("submit", (event) => {
    getPrice();
    event.preventDefault();
});

submit.addEventListener("click", (event) => getPrice(event));

function getPrice() {
    let amount = cryptoAmount.value;
    let crypto = cryptoType.value;
    let fiat = fiatCurrency.value;
    if (amount <= 0 || isNaN(amount)) {
        window.alert("Amount must be greater than 0. Try again!");
    } else {
        fetch(`https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`)
            .then((response) => response.json())
            .then((data) => {
                let newAmount = Number(data.data.amount * amount).toFixed(2);
                numberWithCommas = (amount) =>
                    amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                let symbol;
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
                setTimeout(revealingData, 2000);
                result.textContent = `${amount} ${crypto.toUpperCase()} is worth ${symbol}${numberWithCommas(
                    newAmount
                )} in ${fiat.toUpperCase()}`;
            })
            .catch((error) => console.log(error));
    }
    cryptoAmount.value = "";
}

processingData = () => {
    loader.style.display = "block";
    submit.style.display = "none";
    result.style.display = "none";
    serverTime.textContent = `Fetching data from server...`;
};

revealingData = () => {
    loader.style.display = "none";
    submit.style.display = "block";
    result.style.display = "block";
    getServerTime();
};

getServerTime = () => {
    fetch("https://api.coinbase.com/v2/time")
        .then((response) => response.json())
        .then((data) => (serverTime.textContent = `Data retrieved from server at ${data.data.iso}`))
        .catch((error) => console.log(error));
};
