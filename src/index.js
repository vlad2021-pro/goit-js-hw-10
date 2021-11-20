import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchbox = document.querySelector('#search-box')
const countryInfo = document.querySelector('.country-info')

searchbox.addEventListener('input', debounce(event => {
    const countryName = searchbox.value.trim();
    inputValidation(countryName);

}, DEBOUNCE_DELAY))


function interfaceForm(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
     else if (countries.length >= 2 && countries.length <= 10) {
        countryCardMarkup(countries);
    }
    else {
        descriptionCountry(countries);
    }
}

function interfaceError() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}

function countryCardMarkup(countries) {
    const string = countries.reduce((countryCard, { flags, name }) => {
  
            const template = `<img src="${flags.svg}" class="flag" alt="country flag" width="200" height=''>
    <h1 class="country-name">${name.official}</h1>`;
        
            return countryCard + template;

        }, '');
    
        countryInfo.innerHTML = string;
}

function descriptionCountry(country) {
    country.map(({ flags, name, capital, population, languages }) => {
  
        const template = `<img src="${flags.svg}" class="flag" alt="country flag" width="200" height=''>
    <h1 class="country-name">${name.official}</h1>
    <ul class="stats">
    <li>Capital: <span>${capital}</span> </li>
    <li>Population: <span>${population}</span></li>
    <li>Languages: <span>${Object.values(languages)}</span></li>
    </ul>`;
        
    countryInfo.innerHTML = template;
    });
    
}

function inputValidation(string) {
    if (searchbox.value === "") {
        countryInfo.innerHTML = "";
    }
    else {
        
        fetchCountries(string).then(interfaceForm).catch(interfaceError).finally(()=>searchbox.value === "");
    }
}

