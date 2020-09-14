class Wine {
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
            let p = document.createElement("p");
            p.classList.add(`${attr}`)
            p.innerText = wine[attr];
            div.appendChild(p);
        }
    
        wineContainer().appendChild(div)
    }


    static displayWines() {
        // wine.forEach(wine => wine.renderWine())
    }
}

