const baseUrl = "http://localhost:3000"
const wineContainer = () => document.querySelector("div.main-container");



document.addEventListener("DOMContentLoaded", onLoad)

function onLoad() {
    loadWines();
}

function loadWines() {
    fetch(baseUrl + "/wines")
    .then (resp => {
        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }
        return resp.json()
    })
    .then (data => {
        // Wine.createWine(data);
        Wine.renderWine(data[0]);
    })
    .catch(errors => console.log(errors))
}