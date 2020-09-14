class Wine {

    static all = [];

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
                p.innerText = `${attr}:  ${this[attr]}`;
                div.appendChild(p);
            }
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete Wine";
        deleteBtn.addEventListener("click", Wine.deleteWine)

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

    static createWineForm(e) {
        e.preventDefault();
        
        const strongParams = {
            wine: {
                label: wineLabel().value,
                varietal: wineVarietal().value,
                region: wineRegion().value,
                price: winePrice().value,
            }
        }

        fetch(baseUrl + "/wines.json", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let wine = Wine.create(data.id, data.label, data.varietal, data.region, data.price);
            wine.renderWine();
        })
        .catch(errors => console.log(errors))
    }


    static displayWines() {
        Wine.all.forEach(wine => wine.renderWine())
    }
}

