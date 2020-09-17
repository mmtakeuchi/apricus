class Review {
    static all = [];
    static creatingReview = false;

    constructor(id, username, content, recommend, wine_id) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.recommend = recommend;
        this.wine_id = wine_id
    }

    static loadReviews(e, wineId, wineDiv) {
        e.preventDefault();

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
        const wineCard = e.target.parentNode.parentNode;
        // let example = document.createElement("div")
        // example.setAttribute("id", "exampleModal")
        // example.innerHTML = '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">'
        // example.innerHTML += '<div class="modal-dialog">';
        // example.innerHTML +=     '<div class="modal-content">';
        // example.innerHTML +=         '<div class="modal-header">'
        // example.innerHTML +=             '<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>'
        // example.innerHTML +=             '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        // example.innerHTML +=             '<span aria-hidden="true">&times;</span>'
        // example.innerHTML +=            '</button>'
        // example.innerHTML +=        '</div>'
        // example.innerHTML +=        '<div class="modal-body">'
        // example.innerHTML +=            '...'
        // example.innerHTML +=         '</div>'
        // example.innerHTML +=        '<div class="modal-footer">'
        // example.innerHTML +=            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
        // example.innerHTML +=            '<button type="button" class="btn btn-primary">Save changes</button>'
        // example.innerHTML +=        '</div>'
        // example.innerHTML +=    '</div>'
        // example.innerHTML +=     '</div>'
        // example.innerHTML += '</div>'


        // mainContainer().appendChild(example)
        let closeBtn = document.createElement("button");
        closeBtn.setAttribute("type", "button")
        closeBtn.setAttribute("aria-label", "Close")
        closeBtn.classList.add("close")

        let closeSpan = document.createElement("span");
        closeSpan.setAttribute("aria-hidden", "true");
        closeSpan.innerHTML = "x";
        closeBtn.appendChild(closeSpan);

        let reviewForm = document.createElement("form")
        reviewForm.setAttribute("id", "reviewForm")
        
        let usernameInput = document.createElement("div")
        usernameInput.classList.add("form-group")
        usernameInput.innerHTML = "<label for='username'>Nickname: </label>";
        usernameInput.innerHTML += "<input type='text' id='username' name='username'>";

        let contentInput = document.createElement("div");
        contentInput.classList.add("form-group");
        contentInput.innerHTML = "<label for='content'>Review: </label>";
        contentInput.innerHTML += "<textarea id='content' name='content'></textarea>";

        let recommendInput = document.createElement("div");
        recommendInput.classList.add("form-group");
        recommendInput.innerHTML = "<label for='recommend'> Recommend:</label>"
        recommendInput.innerHTML += "<input type='checkbox' id='recommend' name='recommend' value='true'>";
        
        let submitReview = document.createElement("input")
        submitReview.setAttribute("type", "submit")
        submitReview.classList.add("btn", "btn-outline-primary")
        submitReview.value = "Add Review";
        
        reviewForm.appendChild(closeBtn);
        reviewForm.appendChild(usernameInput);
        reviewForm.appendChild(contentInput);
        reviewForm.appendChild(recommendInput);
        reviewForm.appendChild(submitReview);
        submitReview.addEventListener("click", function(e) {
            Review.addReview(wineCard, reviewForm);
            e.preventDefault();
        })

        wineCard.appendChild(reviewForm);
        e.target.removeEventListener("click", Review.createReviewForm, {passive: false});
    }

    renderReview(wineCard) {
        let div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.classList.add("list-unstyled")

        let usernameP = document.createElement("p");
        usernameP.classList.add("username", "font-weight-bold");
        usernameP.innerText = `${this.username}`;

        let contentP = document.createElement("p");
        contentP.classList.add("content");
        contentP.innerText = `${this.content}`;
        
        let recommendP = document.createElement("p");
        recommendP.classList.add("recommend");
        recommendP.innerText = `${this.recommend ? "Yes, I recommend" : "No, I do not recommend"}`;
        
        let deleteReview = document.createElement("button");
        deleteReview.setAttribute("type", "button");
        deleteReview.classList.add("btn", "btn-sm", "btn-outline-danger");
        deleteReview.innerText = "Delete Review";
        deleteReview.addEventListener("click", Review.destroyReview)
        
        div.appendChild(usernameP);
        div.appendChild(contentP);
        div.appendChild(recommendP);
        div.appendChild(deleteReview);
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
        const usernameInputValue = reviewForm.querySelector("input#username").value
        const contentInputValue = reviewForm.querySelector("textarea#content").value
        const recommendInputValue = reviewForm.querySelector("input#recommend").checked
        
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

    static destroyReview(e) {
        const review = e.target.parentNode

        fetch(`${baseUrl}/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then (resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            debugger;
            review.remove();
            this.displayReviews(review.parentNode)
        })
    }

    static displayReviews(wineDiv) {
        this.innerText = "";
        let reviews = Review.all.filter(review => review.wine_id == wineDiv.id)
        reviews.forEach(review => review.renderReview(wineDiv))
    }
}