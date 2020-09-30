import countries from '../data/countries';

function getCountriesOptions() {
  return countries.map((country) => ({
    label: country.name,
    value: country.alpha2.toUpperCase()
  }));
}

function getCountryName(countryCode) {
  return countries.find((country) => country.alpha2.toUpperCase() === countryCode).name;
}

export default {
  getCountriesOptions,
  getCountryName
};
