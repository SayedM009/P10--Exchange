const currencyOne = document.getElementById("currency__one");
const targetAmount = document.querySelector(".target__amount");
const swapButton = document.querySelector(".swap__btn");
const exchangeRate = document.querySelector(".exchange__rate");
const currencyTwo = document.getElementById("currency__two");
const convertedAmount = document.querySelector(".converted__amount");
const exchangeButton = document.querySelector(".exchange__btn");



// Functions
let targetRate

// Observe changing currencies
const changeCurrency = function () {
  insertCurrentRate()
  fetchAllCurrencies()
};

currencyOne.addEventListener("change", changeCurrency);
currencyTwo.addEventListener("change", changeCurrency);

// Update the target amount value  
targetAmount.addEventListener("input", function(e) {
  targetAmount.value = e.target.value
})

// Swap currencies & amounts
const swapValues = function (e) {
   [currencyOne.value, currencyTwo.value, targetAmount.value, convertedAmount.value] = [currencyTwo.value, currencyOne.value, convertedAmount.value, targetAmount.value] 
    fetchAllCurrencies()
  };

swapButton.addEventListener("click", swapValues);




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
    insertCurrentRate()
    console.log(targetRate)
    if (!(targetAmount.value > 0)) return
    
    convertedAmount.value = (+targetAmount.value * +targetRate).toFixed(2)
  })
  
}

fetchAllCurrencies()
exchangeButton.addEventListener("click", fetchAllCurrencies)

function insertCurrencies(element, arr) {
    arr.map(ele => element.insertAdjacentHTML("beforeend", `<option vlaue='${ele}'>${ele}</option>`))
}

function insertCurrentRate() {
  exchangeRate.textContent = `${currencyOne.value} ${targetRate} ${currencyTwo.value}`
}