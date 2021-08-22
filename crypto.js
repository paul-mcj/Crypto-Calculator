// function httpReq() {
//     this.request = new XMLHttpRequest();
// }

// const request = new httpReq();

// let found;
// httpReq.prototype.get = function (url) {
//     return new Promise(function (resolve, reject) {
//         this.request.open("get", url, true);
//         let self = this;
//         this.request.onload = function () {
//             if (self.request.status === 200) {
//                 found = self.request.responseText;
//                 resolve();
//             } else {
//                 reject("Error: something is wrong...");
//             }
//         };
//         this.request.send();
//     });
// };

// httpReq.prototype.showNumbers = function () {
//     const output = document.querySelector(".price");
//     output.textContent = found;
//     console.log(found);
// };

// request
//     .get("https://api.coinbase.com/v2/exchange-rates")
//     .then(showNumbers())
//     .reject(function (error) {
//         console.log(error);
//     });

const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const form = document.querySelector(".form");
const serverTime = document.querySelector(".serverTime");
const cryptoType = document.querySelector("#cryptoType");
const cryptoAmount = document.querySelector("#cryptoAmount");
const fiatCurrency = document.querySelector("#fiatCurrency");

form.addEventListener("submit", function (event) {
    getPrice();
    getServerTime();
    event.preventDefault();
});

//todo: need to fix??
submit.addEventListener("click", getPrice);
submit.addEventListener("click", getServerTime);

function getServerTime() {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.coinbase.com/v2/time", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            serverTime.textContent = `Data retrieved from server at ${response.data.iso}`;
        } else {
            console.log("Time error");
        }
    };
    xhr.send();
}

function getPrice(event) {
    const xhr = new XMLHttpRequest();
    let crypto = cryptoType.value;
    let amount = cryptoAmount.value;
    let fiat = fiatCurrency.value;
    xhr.open("get", `https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);
            let newAmount = Number(response.data.amount * amount).toFixed(2);
            function numberWithCommas(amount) {
                return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            result.textContent = `${amount} ${crypto.toUpperCase()} is worth ${numberWithCommas(
                newAmount
            )} in ${fiat}`;
        } else {
            console.log("Error");
        }
    };
    xhr.send();
}

// todo:
// - add alerts for amount input (cannot be less than zero, and must be a number)
// - reset the amount field when the submit button is clicked
// - add a gif to "calculate" when the button is clicked for UI
// - update to use es6 classes and constructors
// - update from xhr model of async to es6 promises
