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

let editing = false;

document.addEventListener("DOMContentLoaded", onLoad)

function onLoad() {
    loadWines();
    wineForm().addEventListener('submit', e => {
        e.preventDefault();
        Wine.addWine()
    });
    cancelForm().addEventListener('click', Wine.changeToAdd);
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

// function loadReviews(e, wineId, wineDiv) {
//     fetch(`${baseUrl}/wines/${wineId}`)
//     .then (resp => {
//         if (resp.status !== 200) {
//             throw new Error(resp.statusText);
//         }
//         return resp.json()
//     })
//     .then (data => {
//         let reviews = data.reviews.filter(review => review.wine_id == data.id)
//         Review.createReviews(reviews);
//         Review.displayReviews(wineDiv);
//     })
// }

function resetInputs() {
    wineLabel().value = "";
    wineVarietal().value = "";
    wineRegion().value = "";
    
    Array.prototype.find.call(winePrice(), price => price.checked).parentNode.classList.remove("active");
    Array.prototype.find.call(winePrice(), price => price.checked).removeAttribute("checked");
    
    wineForm().classList.toggle("was-validated");
}
