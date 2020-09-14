const baseUrl = "http://localhost:3000"

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
        Wine.createWine(data);
        Wine.displayWine();
    })
    .catch(errors => console.log(errors))
}