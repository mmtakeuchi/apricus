const baseUrl = "http://localhost:3000"

const wineContainer = () => document.querySelector("div.main");
const wineForm = () => document.querySelector("form");
const wineLabel = () => document.getElementById("wine-label");
const wineVarietal = () => document.getElementById("wine-varietal");
const wineRegion = () => document.getElementById("wine-region");
const winePrice = () => document.getElementById("wine-price");
const wineSubmit = () => document.getElementById("create-wine")

let editing = false;

document.addEventListener("DOMContentLoaded", onLoad)

function onLoad() {
    loadWines();
    wineForm().addEventListener('submit', Wine.addWine);
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
    winePrice().value = "";
}