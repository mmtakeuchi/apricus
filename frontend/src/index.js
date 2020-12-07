const baseUrl = "http://localhost:3000"

const wineContainer = () => document.querySelector("div.main");
const wineFormHeader = () => document.querySelector("p.h4")
const wineForm = () => document.querySelector("form");
const wineLabel = () => document.getElementById("wine-label");
const wineVarietal = () => document.getElementById("wine-varietal");
const wineRegion = () => document.getElementById("wine-region");
const winePrice = () => document.getElementsByName("wine-price");
const wineSubmit = () => document.getElementById("create-wine");
const formBtn = () => document.getElementById("formBtn");
const cancelForm = () => document.getElementById("cancel-wine");
const wineSearch = () => document.getElementById("wineSearch");
const searchInput = () => document.getElementById("wineSearchForm");

let editing = false;

document.addEventListener("DOMContentLoaded", onLoad)

function onLoad() {
    loadWines();
    wineForm().addEventListener('submit', e => {
        e.preventDefault();

        var form = document.getElementById("bootForm");
          
        if (form.checkValidity()) {
            Wine.addWine()
        }
        
        form.classList.add('was-validated');
    });
    cancelForm().addEventListener('click', Wine.changeToAdd);
    wineSearch().addEventListener('submit', e => {
        e.preventDefault();

        if (searchInput().value.length !== 0) {
            Wine.wineFilter(e);
        } else {
            Wine.displayWines();
        }
        
    });
}

function loadWines(div) {
    fetch(`${baseUrl}/wines`)
    .then (resp => {
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then (data => {
        Wine.createWines(data);
        Wine.displayWines();
    })
    .catch(errors => console.log(errors))
}

function resetInputs() {
    wineLabel().value = "";
    wineVarietal().value = "";
    wineRegion().value = "";

    let priceRange = Array.prototype.find.call(winePrice(), price => price.checked);

    if (priceRange) {
        priceRange.parentNode.classList.remove("active");
        priceRange.removeAttribute("checked");
    }
    
    wineForm().classList.remove("was-validated");
}
