const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const country_list =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json";

const dropdowns = document.querySelectorAll(".dropdown select");

const countryList = (async () => {
  let response = await fetch(country_list);
  let countryList = await response.json();
  for (const select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = `${currCode.toUpperCase()} / ${
        countryList[currCode]
      }`;
      newOption.value = currCode;
      select.append(newOption);
      if (select.name === "from" && currCode === "usd") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "npr") {
        newOption.selected = "selected";
      }
    }
  }
})();
