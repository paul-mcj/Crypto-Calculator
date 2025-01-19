const form = document.querySelector(".form");
const cryptoAmount = document.querySelector("#crypto-amount");
const cryptoType = document.querySelector("#crypto-type");
const fiatCurrency = document.querySelector("#fiat-currency");
const loader = document.querySelector(".loader");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
const serverTime = document.querySelector(".server-time");
const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();

form.addEventListener("submit", function (event) {
	getPrice();
	event.preventDefault();
});

submit.addEventListener("click", getPrice);

function getPrice() {
	const xhr = new XMLHttpRequest();
	let amount = cryptoAmount.value;
	let crypto = cryptoType.value;
	let fiat = fiatCurrency.value;
	if (amount <= 0 || isNaN(amount)) {
		window.alert("Amount must be greater than 0. Try again!");
	} else {
		xhr.open(
			"get",
			`https://api.coinbase.com/v2/prices/${crypto}-${fiat}/spot`,
			true
		);
		xhr.onload = function () {
			if (this.status === 200) {
				let response = JSON.parse(this.responseText);
				let newAmount = Number(
					response.data.amount * amount
				).toFixed(2);
				function numberWithCommas(amount) {
					return amount
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
			} else {
				window.alert("Something when wrong with retrieving data");
			}
		};
		xhr.send();
		cryptoAmount.value = "";
	}
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
	serverTime.textContent = "";
}
