const currencyOne = document.getElementById("currency__one");
const targetAmount = document.querySelector(".target__amount");
const swapButton = document.querySelector(".swap__btn");
const exchangeRate = document.querySelector(".exchange__rate");
const currencyTwo = document.getElementById("currency__two");
const convertedAmount = document.querySelector(".converted__amount");
const exchangeButton = document.querySelector(".exchange__btn");

// Values
const currencyValueOne = currencyOne.value;
const currencyValueTwo = currencyTwo.value;
const targetAmountValue = targetAmount.value;
const convertedAmountValue = convertedAmount.value;

// Functions

// Observe changing currencies
const changeCurrency = function (e) {
  exchangeRate.textContent = `${currencyValueOne} rate ${currencyValueTwo}`;
};

currencyOne.addEventListener("change", changeCurrency);
currencyTwo.addEventListener("change", changeCurrency);

// Swap currencies & amounts
let swaped = false;
const swapValues = function (e) {
  if (!swaped) {
    currencyOne.value = currencyValueTwo;
    currencyTwo.value = currencyValueOne;
    targetAmount.value = convertedAmountValue;
    convertedAmount.value = targetAmountValue;
    swaped = true;
  } else {
    currencyOne.value = currencyValueOne;
    currencyTwo.value = currencyValueTwo;
    targetAmount.value = targetAmountValue;
    convertedAmount.value = convertedAmountValue;
    swaped = false;
  }
};

swapButton.addEventListener("click", swapValues);

// Convert the amounts depends on currencies
const convertAmount = function (e) {};

exchangeButton.addEventListener("click", convertAmount);
