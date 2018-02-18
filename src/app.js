import CitySelector from './CitySelector';
const $ = require('jquery');

const body = document.getElementById('body');
const createCitySelector = document.getElementById('createCitySelector');
const destroyCitySelector = document.getElementById('destroyCitySelector');
const regionContainer = "regionContainer";
const regionText = document.getElementById('regionText');
const localityText = document.getElementById('localityText');

body.addEventListener("selected", (event) => {
    if (event.detail.idItem) {
        regionText.innerHTML = event.detail.idItem;
    }
    if (event.detail.idItem) {
        localityText.innerHTML = event.detail.value;
    }
}, false);

createCitySelector.addEventListener('click', createNewCitySelector);
destroyCitySelector.addEventListener('click', destroyNewCitySelector);

function createNewCitySelector() {
    const id = regionContainer;

    if (!document.getElementById(id).firstChild) {
        $(`#info`).show();

        const citySelector = new CitySelector({
            elementId: id,
            regionsUrl: 'http://localhost:3000/regions',
            localCitiesUrl: 'http://localhost:3000/localities',
            saveUrl: 'http://localhost:3000/selectedRegions'
        });
    }

    // if (!document.getElementById("regionContainer1").firstChild) {
    //     $(`#info`).show();

    //     const citySelector1 = new CitySelector({
    //         elementId: "regionContainer1",
    //         regionsUrl: 'http://localhost:3000/regions',
    //         localCitiesUrl: 'http://localhost:3000/localities',
    //         saveUrl: 'http://localhost:3000/selectedRegions'
    //     });
    // }
}

function destroyNewCitySelector() {
    const id = regionContainer;
    $(`#info`).hide();

    if (document.getElementById(id).firstChild) {
        $(`#${id}`).empty();
    }
}
