const currencyOne = document.getElementById("currency__one");
const targetAmount = document.querySelector(".target__amount");
const swapButton = document.querySelector(".swap__btn");
const exchangeRate = document.querySelector(".exchange__rate");
const currencyTwo = document.getElementById("currency__two");
const convertedAmount = document.querySelector(".converted__amount");
const exchangeButton = document.querySelector(".exchange__btn");

// Values
let currencyValueOne = currencyOne.value;
let currencyValueTwo = currencyTwo.value;
let targetAmountValue = targetAmount.value;
let convertedAmountValue = convertedAmount.value;

// Functions

// Observe changing currencies
const changeCurrency = function (e) {
  exchangeRate.textContent = `${currencyOne.value}  ${currencyTwo.value}`;
  fetchAllCurrencies()
};

currencyOne.addEventListener("change", changeCurrency);
currencyTwo.addEventListener("change", changeCurrency);

// Update the target amount value  
targetAmount.addEventListener("change", function(e) {
  targetAmountValue = e.target.value
})

// Update current values
function updateValues(value1, value2, value3, value4) {
  currencyOne.value = value1
  currencyTwo.value = value2
  targetAmount.value = value3
  convertedAmount.value = value4
}


// Swap currencies & amounts
let swaped = false;
const swapValues = function (e) {
   [currencyValueOne, currencyValueTwo, targetAmountValue, convertedAmountValue] = [currencyValueTwo, currencyValueOne, convertedAmountValue, targetAmountValue] 
    updateValues(currencyValueOne, currencyValueTwo, targetAmountValue, convertedAmountValue)

  };

swapButton.addEventListener("click", swapValues);

// Convert the amounts depends on currencies
const convertAmount = function (e) {};

exchangeButton.addEventListener("click", convertAmount);

let targetRate
exchangeButton.addEventListener("click", fetchAllCurrencies)

function fetchAllCurrencies() {
  const reponse = fetch(`https://v6.exchangerate-api.com/v6/9fc97cde8a32cd25c00dd2c5/latest/${currencyOne.value}`)
  .then(res => res.json())
  .then(data => {
    // 1. Fetch all the currencies
    const currencies = Object.keys(data.conversion_rates)
    // 2. Get the target rate
    targetRate = data.conversion_rates[currencyTwo.value]
    // 3. insert all the currencies to the select element
    insertCurrencies(currencyOne, currencies)
    insertCurrencies(currencyTwo, currencies)
    // 4. Insert the target rate and the currencies to the  exchange rate element
    insertCurrentRate(targetRate)

  })

}

fetchAllCurrencies()

function insertCurrencies(element, arr) {
    arr.map(ele => element.insertAdjacentHTML("beforeend", `<option vlaue='${ele}'>${ele}</option>`))
}

function insertCurrentRate(rate) {
  exchangeRate.textContent = `${currencyValueOne} ${rate} ${ currencyValueTwo}`
}