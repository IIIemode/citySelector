require('./style.less');
const $ = require('jquery');


export default class {
    constructor({elementId, regionsUrl, localCitiesUrl, saveUrl}) {
        this.elementId = elementId;
        this.regionsUrl = regionsUrl;
        this.localCitiesUrl = localCitiesUrl;
        this.saveUrl = saveUrl;

        this.listOfRegions = document.createElement('ul');
        this.listOfRegions.id = "listOfRegions";
        this.listOfRegions.classList.add('selectRegionContainer__item');
        this.listOfRegions.classList.add('listOfRegions');

        this.listOfCities = document.createElement('ul');
        this.listOfCities.id = "listOfCities";
        this.listOfCities.classList.add('selectRegionContainer__item');
        this.listOfCities.classList.add('listOfCities');

        this.save = document.createElement('input');
        this.save.type = 'button';
        this.save.value = 'Сохранить';
        this.save.id = "save";
        this.save.classList.add('selectRegionContainer__item');
        this.save.classList.add('listOfCities');
        this.save.style.display = 'none';
        

        $(`#${this.elementId}`)
            .append(this.listOfRegions)
            .append(this.listOfCities)
            .append(this.save)
            .append(`
            <button 
                id="#regionSelector"
                >Выбрать регион
            </button>
        `).on("click", "button", ({target}) => {
            $(target).hide();
            this.getListOfRegion();
        });
    }

    getListOfRegion() {
        $.ajax({
            url: this.regionsUrl,
            success: data => {
                data.map((region, i) => {
                    $(`
                        <li>
                            <input
                                type="button"
                                data-id="${i}" 
                                data-iditem="${region.id}"
                                class="__item"
                                value="${region.title}">
                            </input>
                        </li>
                    `).prependTo(this.listOfRegions)
                    .on("click", "input", ({target}) => {
                        $('#regionText').empty();
                        $('#localityText').empty();
                        $(this.save).hide();
                        $('#regionText').append(target.dataset.iditem);
                        this.getListOfSities(target.dataset.id);
                    }); 
                })  
            }
        });
    }

    getListOfSities(id) {
        $.ajax({
            url: this.localCitiesUrl,
            success: data => {
                $('#listOfCities').empty();
                (data[id].list).map((city, i) => {
                    $(`
                        <li>
                            <input
                                type="button"
                                data-id="${i}"
                                class="-item"
                                value="${city}">
                            </input>
                        </li>
                    `).prependTo(document.querySelector('#listOfCities'))
                    .on("click", "input", ({target}) => {
                        $('#localityText').empty();
                        $('#localityText').append(target.value);
                        $(this.save).show();
                        $(this.save).on("click", () => {
                            this.deleteList();

                            $.post({
                                url: this.saveUrl,
                                data: (data) => {
                                    console.log('1');
                                }
                            });
                        });
                    }); 
                })
            }
        });
    }

    deleteList() {
        $(`#${this.elementId}`).empty();
    }
}
