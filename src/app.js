import CitySelector from './CitySelector';
const $ = require('jquery');

const createCitySelector = document.querySelector('#createCitySelector');
const destroyCitySelector = document.querySelector('#destroyCitySelector');
const regionText = document.querySelector('#regionText');
const localityText = document.querySelector('#localityText');

createCitySelector.addEventListener('click', createInstanceOfClass);
destroyCitySelector.addEventListener('click', destroyInstanceOfClass);

function createInstanceOfClass() {
    $(`#info`).show();
    
    const citySelector = new CitySelector({
        elementId: 'selectRegionContainer',
        regionsUrl: 'http://localhost:3000/regions',
        localCitiesUrl: 'http://localhost:3000/localities',
        saveUrl: 'http://localhost:3000/selectedRegions'
    });
}

function destroyInstanceOfClass() {
    $(`#selectRegionContainer`).empty();
}
