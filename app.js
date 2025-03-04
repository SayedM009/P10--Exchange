const currencyOne = document.getElementById("currency__one");
const targetAmount = document.querySelector(".target__amount");
const swapButton = document.querySelector(".swap__btn");
const exchangeRate = document.querySelector(".exchange__rate");
const currencyTwo = document.getElementById("currency__two");
const convertedAmount = document.querySelector(".converted__amount");
const exchangeButton = document.querySelector(".exchange__btn");


currencyOne.value = "USD";
currencyTwo.value = "EUR";


// Functions
let displayedRate
// Fetch & List currencies
async function fetchCurrencies() {
  try {
    if (!(currencyOne && currencyTwo)) return
    // 1. Fetch All currencies
    const response = await fetch(`https://v6.exchangerate-api.com/v6/9fc97cde8a32cd25c00dd2c5/latest/${currencyOne.value}`)
    const data = await response.json()
    // 2. Wrap all currencies
    const currencies = Object.keys(data.conversion_rates).filter(currency => currency !== "AED" && currency !== "USD")
    // 3. List all currencies in selecte elements
    insertCurrencies([currencyOne, currencyTwo], currencies)
    // 4. Display rate
    displayedRate = data.conversion_rates[currencyTwo.value]
    displayRate(displayedRate)
  } catch(error) {
    console.log("Error! Could not fetch the currencies", error)
  }
}
fetchCurrencies()

// Insert currencies into select elements
function insertCurrencies(elements, arr) {
  // 1. Loop over the elements to add all currencies into each element
  elements.forEach(element => {
    arr.map(currency => element.insertAdjacentHTML("beforeend", `<option value='${currency}'>${currency}</option>`))
  });
}

// Change Currency 
async function updateRate() {
    try {
      if (!(currencyOne && currencyTwo)) return
      // 1. Get the updated rate
      const response = await fetch(`https://v6.exchangerate-api.com/v6/9fc97cde8a32cd25c00dd2c5/latest/${currencyOne.value}`)
      const data = await response.json()
      // 2. Display rate
      displayedRate = data.conversion_rates[currencyTwo.value]
      displayRate(displayedRate)
    } catch(error) {
      console.log("Could not upate the rate please refesh the APP!", error)
    }
}
currencyOne.addEventListener("change", updateRate)
currencyTwo.addEventListener("change", updateRate)

// Display Rate
function displayRate(rate) {
  exchangeRate.textContent = `1 ${currencyOne.value} = ${rate.toFixed(4)} ${currencyTwo.value}`
}

// Exchange  currencies
exchangeButton.addEventListener("click", function() {
  if (!+targetAmount.value) return  
  convertedAmount.value = (+targetAmount.value * displayedRate).toFixed(4)
})

// Swap currencies
swapButton.addEventListener("click", function() {
  [currencyOne.value, currencyTwo.value ] = [currencyTwo.value, currencyOne.value]
  [targetAmount.value, convertedAmount.value] = [convertedAmount.value, targetAmount.value]
  updateRate()
}) 

function formatingCurrency(currency, amount) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: currency
  }).format(amount)
}