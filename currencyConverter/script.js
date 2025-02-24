const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const country_list =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("select[name='from']");
const toCurr = document.querySelector("select[name='to']");
const result = document.querySelector(".results h3");

window.addEventListener("load", () => {
  countryList();
});

const countryList = async () => {
  let response = await fetch(country_list);
  let countryList = await response.json();

  for (const select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = `${currCode.toUpperCase()} / ${
        countryList[currCode]
      }`;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "usd") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "npr") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
};

const updateFlag = (element) => {
  let currencyCode = element.value.toUpperCase();
  let countryCode = flags[currencyCode];
  let flag = countryCode.toLowerCase();
  let newSrc = `https://flagcdn.com/64x48/${flag}.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}.json`;
  const response = await fetch(URL);
  const data = await response.json();

  const rate = data[fromCurr.value];
  let toRate = "";

  for (const key in rate) {
    if (key === toCurr.value) {
      toRate += rate[key];
    }
  }

  result.innerHTML = `${amtVal} ${fromCurr.value.toUpperCase()} = ${
    toRate * amtVal
  } ${toCurr.value.toUpperCase()}`;
});
