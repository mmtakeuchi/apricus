class Wine {

    static all =[];

    constructor(label, varietal, region, price) {
        this.label = label;
        this.varietal = varietal;
        this.region = region;
        this.price = price
    }

    static renderWine(wine) {
        const div = document.createElement("div");
        div.classList.add("card")
        div.setAttribute("id", wine.id)

        for (const attr in wine) {
            if (attr !== "id") {
            let p = document.createElement("p");
            p.classList.add(`${attr}`)
            p.innerText = wine[attr];
            div.appendChild(p);
            }
        }
    
        wineContainer().appendChild(div)
    }

    static createWine(e) {
        
    }


    static displayWines() {
        // Wine.all.forEach(wine => wine.renderWine())
    }
}

