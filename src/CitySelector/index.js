require('./style.less');
const $ = require('jquery');


export default class CitySelector {
    constructor({elementId, regionsUrl, localCitiesUrl, saveUrl}) {
        this.elementId = elementId;
        this.regionsUrl = regionsUrl;
        this.localCitiesUrl = localCitiesUrl;
        this.saveUrl = saveUrl;
        this.lastId = '';
        this.lastTitle = '';
        this._id = '';
        this._title = '';
        this.el = $(`#${this.elementId}`);

        this.listOfRegions = $('<ul>', { id: `listOfRegions-${this.elementId}`, class: `${this.elementId}__item listOfRegions-${this.elementId}`});
        this.listOfCities = $('<ul>', { id: `listOfCities-${this.elementId}`, class: `${this.elementId}__item listOfCities-${this.elementId}`});
        this.save = $('<input>', { id: `save-${this.elementId}`, class: `${this.elementId}__item save-${this.elementId}`, type : 'button', value : 'Сохранить'});
        $(this.save).hide();

        $(this.save).on("click", event => {
            this.stopBubble(event);

            this.deleteList();
            $.ajax({
                type: 'POST',
                url: this.saveUrl,
                data: {
                    "idItem": this._id,
                    "title": this._title
                },
                async: false
            });
        });
        
        this.el.append(this.listOfRegions)
            .append(this.listOfCities)
            .append(this.save)
            .append(`
            <button 
                id="regionSelector-${this.elementId}"
                >Выбрать регион
            </button>
        `).on("click", "button", event => {
            this.stopBubble(event);

            $(event.target).hide();
            this.getListOfRegion();
        });

        this.listOfRegions[0].addEventListener('click', event => {
            const idItem = event.target.dataset["iditem"];
            $(this.save).prop('disabled', true);

            if (this.lastId !== idItem) {
                this.lastId = idItem;
                this._id = idItem;
                this.listOfCities.empty();
                this.getListOfSities(event.target.dataset.id);

                this.dispatchEvent(idItem, '');
            }
        }, true);

        this.listOfCities[0].addEventListener('click', event => {
            $(this.save).prop('disabled', false);
            $(this.save).show();
            if (this.lastTitle !== event.target.value) {
                this.lastTitle = event.target.value;
                const value = event.target.value;
                this._title = event.target.value;

                this.dispatchEvent(this.lastId, value);
            }
        });
    }

    dispatchEvent(idItem, value) {
        const event = new CustomEvent('selected', {
            detail: { idItem, value },
            bubbles: true
        });

        this.el[0].dispatchEvent(event);
    }

    getListOfRegion() {
        $.ajax({
            url: this.regionsUrl,
            success: data => {
                data.map((region, i) => {
                    $(`
                        <li class="listOfRegions-${this.elementId}__item">
                            <input
                                class="listOfRegions-${this.elementId}__button"
                                type="button"
                                data-id="${i}" 
                                data-iditem="${region.id}"
                                value="${region.title}">
                            </input>
                        </li>
                    `).prependTo(this.listOfRegions);
                });
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
                        <li class="listOfCities-${this.elementId}__item">
                            <input
                                class="listOfCities-${this.elementId}__button"
                                type="button"
                                data-id="${i}"
                                value="${city}">
                            </input>
                        </li>
                    `).prependTo(this.listOfCities);
                });
            }
        });
    }

    deleteList() {
        $(`#${this.elementId}`).empty();
    }

    stopBubble(event){
        if(event && event.stopPropagation)
            event.stopPropagation();
        else
            window.event.cancelBubble = true;
    }
}
