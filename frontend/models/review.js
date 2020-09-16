class Review {

    static all = [];

    constructor(id, username, content, recommend, wine_id) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.recommend = recommend;
        this.wine_id = wine_id
    }

    static loadReviews(wineId, wineDiv) {  
        fetch(`${baseUrl}/wines/${wineId}`)
        .then (resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json()
        })
        .then (data => {
            let reviews = data.reviews.filter(review => review.wine_id == data.id)
            Review.createReviews(reviews);
            Review.displayReviews(wineDiv);
        })
    }

    static createReviewForm(e) {
        const wineCard = e.target.parentNode;

        let reviewForm = document.createElement("form")
        reviewForm.setAttribute("id", "reviewForm")

        let usernameInput = document.createElement("div")
        usernameInput.innerHTML = "<label for='username'>Nickname: </label>";
        usernameInput.innerHTML += "<input type='text' id='username' name='username'>";

        let contentInput = document.createElement("div")
        contentInput.innerHTML = "<label for='content'>Review: </label>";
        contentInput.innerHTML += "<textarea id='content' name='content'></textarea>";

        let recommendInput = document.createElement("div")
        recommendInput.innerHTML = "<label for='recommend'>Recommend? </label>"
        recommendInput.innerHTML += "<input type='radio' id='recommend' name='recommend' value='true'> Yes";
        recommendInput.innerHTML += "<input type='radio' id='recommend' name='recommend' value='false'> No";

        let submitReview = document.createElement("input")
        submitReview.setAttribute("type", "submit")
        submitReview.value = "Add Review";
        
        reviewForm.appendChild(usernameInput);
        reviewForm.appendChild(contentInput);
        reviewForm.appendChild(recommendInput);
        reviewForm.appendChild(submitReview);
        submitReview.addEventListener("click", function(e) {
            Review.addReview(wineCard, reviewForm);
            e.preventDefault();
        })
        wineCard.appendChild(reviewForm);
    }

    renderReview(wineCard) {
        let div = document.createElement("div");
        div.setAttribute("id", this.id);

        let usernameP = document.createElement("p");
        usernameP.classList.add("username");
        usernameP.innerText = `${this.username}`;

        let contentP = document.createElement("p");
        contentP.classList.add("content");
        contentP.innerText = `${this.content}`;
        
        let recommendP = document.createElement("p");
        recommendP.classList.add("recommend");
        recommendP.innerText = `${this.recommend}`;
        
        // for (const attr in this) {
        //     if (attr !== "id") {
        //         let username = document.createElement("p");
        //         p.classList.add(`${attr}`)
        //         p.innerText = `${this[attr]}`;
        //         div.appendChild(p);
        //     }
        // }  
        // const addReviewBtn = document.createElement("button");
        // addReviewBtn.id = this.id
        // addReviewBtn.innerText = "Create Review"
        // addReviewBtn.addEventListener("click", Review.createReviewForm);      
        
        div.appendChild(usernameP);
        div.appendChild(contentP);
        div.appendChild(recommendP);
        // div.appendChild(addReviewBtn)
        wineCard.appendChild(div);
    }

    static createReviews(reviewData) {
        reviewData.forEach(data => Review.create(data.id, data.username, data.content, data.recommend, data.wine_id));
    }

    static create(id, username, content, recommend, wine_id) {
        let review = new Review(id, username, content, recommend, wine_id);
        Review.all.push(review);
        return review;
    }

    static addReview(wineCard, reviewForm) {
        debugger;
        const usernameInputValue = reviewForm.querySelector("input#username").value
        const contentInputValue = reviewForm.querySelector("textarea#content").value
        const recommendInputValue = Array.prototype.find.call(reviewForm.querySelectorAll("input#recommend"), x => x.checked).value
        
        const strongParams = {
            review: {
                username: usernameInputValue,
                content: contentInputValue,
                recommend: recommendInputValue,
                wine_id: wineCard.id
            }
        }

        fetch(baseUrl + "/reviews", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let review = Review.create(data.id, data.username, data.content, data.recommend, data.wine_id);
            review.renderReview(wineCard);

            reviewForm.innerText = "";
        })
        .catch(errors => console.log(errors))
    }

    static displayReviews(wineDiv) {
        this.innerText = "";
        Review.all.forEach(review => review.renderReview(wineDiv));
    }
}