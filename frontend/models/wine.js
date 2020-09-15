class Wine {

    static all = [];
    static editedWine = null;

    constructor(id, label, varietal, region, price) {
        this.id = id;
        this.label = label;
        this.varietal = varietal;
        this.region = region;
        this.price = price
    }

    renderWine() {
        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("id", this.id);

        for (const attr in this) {
            if (attr !== "id") {
                let p = document.createElement("p");
                p.classList.add(`${attr}`)
                p.innerText = `${this[attr]}`;
                div.appendChild(p);
            }
        }

        const editBtn = document.createElement("button");
        editBtn.id = this.id
        editBtn.innerText = "Edit Wine";
        editBtn.addEventListener("click", Wine.editWine);

        const deleteBtn = document.createElement("button");
        deleteBtn.id = this.id
        deleteBtn.innerText = "Delete Wine";
        deleteBtn.addEventListener("click", Wine.deleteWine);

        const reviewBtn = document.createElement("button");
        reviewBtn.id = this.id
        reviewBtn.innerText = "Add Review";
        reviewBtn.addEventListener("click", Review.createReviewForm);


        div.appendChild(reviewBtn);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        wineContainer().appendChild(div)
    }

    static createWines(wineData) {
        wineData.forEach(data => Wine.create(data.id, data.label, data.varietal, data.region, data.price));
    }

    static create(id, label, varietal, region, price) {
        let wine = new Wine(id, label, varietal, region, price);
        Wine.all.push(wine);
        return wine;
    }

    static editWine(e) {
        editing = true;

        wineLabel().value = this.parentNode.querySelector('p.label').innerText;
        wineVarietal().value = this.parentNode.querySelector('p.varietal').innerText;
        wineRegion().value = this.parentNode.querySelector('p.region').innerText;
        winePrice().value = this.parentNode.querySelector('p.price').innerText;
        wineSubmit().value = "Update Wine";

        Wine.editedWine = this.parentNode
    }

    static addWine(e) {
        e.preventDefault();

        if (editing) {
            Wine.updateWine();
        } else {
            const strongParams = {
                wine: {
                    label: wineLabel().value,
                    varietal: wineVarietal().value,
                    region: wineRegion().value,
                    price: winePrice().value,
                }
            }
    
            fetch(`${baseUrl}/wines.json`, {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then(data => {
                let wine = Wine.create(data.id, data.label, data.varietal, data.region, data.price);
                wine.renderWine();
            })
            .catch(errors => console.log(errors));

            resetInputs();
        }
    }

    static updateWine(e) {
        let label = wineLabel().value;
        let varietal = wineVarietal().value;
        let region = wineRegion().value;
        let price = winePrice().value;

        const strongParams = {
            wine: {
                label: label,
                varietal: varietal,
                region: region,
                price: price
            }
        }
        
        fetch(baseUrl + "/wines/" + `${Wine.editedWine.id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let updatedWien = Wine.all.find(wine => wine.id == data.id);
            updatedWien.label = data.label;
            updatedWien.varietal = data.varietal;
            updatedWien.region = data.region;
            updatedWien.price = data.price;
            Wine.displayWines();

            editing = false;
            Wine.editedWine = null;
            resetInputs();
            wineSubmit().value = "Create Wine";
        })
    }

    static deleteWine(e) {
        let wineId = e.target.parentNode.id

        fetch(baseUrl + "/wines/" + `${wineId}`, {
            method: "DELETE"
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            // Wine.all = Wine.all.filter(wine => wine.id !== data.id);
            wineId.target.remove();
            Wine.displayWines();
        })
    }

    static displayWines() {
        wineContainer().innerText = "";
        Wine.all.forEach(wine => wine.renderWine());
    }
}
