
let restCountriesUrl='https://restcountries.com/v3.1'
let openExchangeRateUrl='http://api.exchangeratesapi.io'
let openExchangeRareToken='509636f268b54712de45888d936030f6'

export const getAllCountries = () => {
    const options = {
        url: `${restCountriesUrl}/all/?fields=name`,
        method: "get",
    }
    return options;
}

export const getAllCurrencies = () => {
    const options = {
        url: `${openExchangeRateUrl}/symbols?access_key=${openExchangeRareToken}`,
        method: "get"
    }
    return options;
}
