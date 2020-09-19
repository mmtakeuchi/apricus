class Wine {

    static all = [];
    static editedWine = null;

    constructor(id, label, varietal, region, price) {
        this.id = id;
        this.label = label;
        this.varietal = varietal;
        this.region = region;
        this.price = price;
    }

    renderWine() {
        const div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute("id", this.id);
        div.setAttribute("style", "width: 22em");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");
        divBody.setAttribute("id", this.id);
        // div.addEventListener("click",()=>{console.log('card clicked')})

        for (const attr in this) {
            if (attr !== "id") {
                let dl = document.createElement("dl");
                dl.classList.add("row");

                let dt = document.createElement("dt");
                dt.classList.add("col-sm-4");
                dt.innerText = `${attr.charAt(0).toUpperCase() + attr.slice(1)}`;

                let dd = document.createElement("dd");
                dd.setAttribute("id", `${attr}`)
                dd.classList.add("col-sm-8");
                dd.innerText = `${this[attr].split(" ").map(word => {
                    return word.charAt(0).toUpperCase() + word.slice(1)
                   }).join(" ")}`;
                
                dl.appendChild(dt);
                dl.appendChild(dd);
                divBody.appendChild(dl);
                div.appendChild(divBody);
            }
        }

        const reviewsContainer = document.createElement("div")
        reviewsContainer.setAttribute("id", `review-${this.id}`);
        reviewsContainer.classList.add("collapse");
      

        const editBtn = document.createElement("button");
        editBtn.id = this.id;
        editBtn.classList.add("col", "btn", "btn-sm", "btn-success")
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("data-toggle", "collapse");
        editBtn.setAttribute("data-target", "collapseForm");
        editBtn.setAttribute("aria-expanded", "false");
        editBtn.setAttribute("aria-conrol", "collapseForm");
        editBtn.innerText = "Edit Wine";
        editBtn.addEventListener("click", Wine.editWine);

        const deleteBtn = document.createElement("button");
        deleteBtn.id = this.id;
        deleteBtn.classList.add("col", "btn", "btn-sm", "btn-danger");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.innerText = "Delete Wine";
        deleteBtn.addEventListener("click", Wine.deleteWine);

        const reviewBtn = document.createElement("button");
        reviewBtn.classList.add("btn", "btn-block", "btn-link");
        reviewBtn.setAttribute("id", this.id)
        reviewBtn.setAttribute("type", "button");
        reviewBtn.setAttribute("data-toggle", "collapse");
        reviewBtn.setAttribute("data-target", `review-${this.id}`);
        reviewBtn.innerText = "Reviews"
        reviewBtn.addEventListener("click", e => {
            // debugger;
            if (reviewsContainer.childNodes.length == 0) {
                Review.loadReviews(reviewsContainer);
            }
            reviewsContainer.classList.toggle("collapse");
        });
        // aria-expanded="false" aria-controls="collapseExample">

        const addReviewBtn = document.createElement("button");
        addReviewBtn.id = this.id;
        addReviewBtn.classList.add("col", "btn", "btn-sm", "btn-info");
        addReviewBtn.setAttribute("type", "button");
        addReviewBtn.setAttribute("data-toggle", "modal");
        addReviewBtn.setAttribute("data-target", "#reviewModal");
        addReviewBtn.innerText = "Create Review"
        addReviewBtn.addEventListener("click", e => {
            // console.log(e)
            Review.createReviewForm(reviewsContainer)
        });
        // type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">

        const btnDiv = document.createElement("div")
        btnDiv.classList.add("row")
        
        btnDiv.appendChild(reviewBtn);
        btnDiv.appendChild(addReviewBtn)
        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);
        divBody.appendChild(btnDiv)
        div.appendChild(reviewsContainer);
        wineContainer().appendChild(div)

        // div.appendChild(reviewBtn)
        // div.appendChild(addReviewBtn)
        // div.appendChild(editBtn);
        // div.appendChild(deleteBtn);
        // wineContainer().appendChild(div)
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

        wineLabel().value = this.parentNode.parentNode.querySelector('dd#label').innerText;
        wineVarietal().value = this.parentNode.parentNode.querySelector('dd#varietal').innerText;
        wineRegion().value = this.parentNode.parentNode.querySelector('dd#region').innerText;
        winePrice().value = this.parentNode.parentNode.querySelector('dd#price').innerText;
        // document.getElementById(this.parentNode.parentNode.querySelector('dd#price').innerText).classList.add("active")
        wineSubmit().value = "Update Wine";
        // debugger;

        Wine.editedWine = this.parentNode.parentNode
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
                    price: Array.prototype.find.call(winePrice(), price => price.checked).id
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
        e.preventDefault();
        
        fetch(`${baseUrl}/wines/${e.target.parentNode.parentNode.id}`, {
            method: "DELETE"
        })
        .then (resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            Wine.all = Wine.all.filter(wine => wine.id !== data.id);
            Wine.displayWines();
        })
    }

    static displayWines() {
        wineContainer().innerText = "";
        Wine.all.forEach(wine => wine.renderWine());
    }

    static changeToAdd() {
        editing = false;
    
        wineLabel().value = "";
        wineVarietal().value = "";
        wineRegion().value = "";
        winePrice().value = "";
        wineSubmit().value = "Create Wine";
    }
}
