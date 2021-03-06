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

    static loadReviews(reviewsContainer) {
        fetch(`${baseUrl}/wines/${reviewsContainer.parentNode.id}`)
        .then (resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json()
        })
        .then (data => {
            let reviews = data.reviews.filter(review => review.wine_id == data.id)
            Review.createReviews(reviews);
            Review.displayReviews(reviewsContainer);
        })
    }


    static createReviewForm(reviewsContainer) {
        let reviewDiv = document.createElement("div");
        reviewDiv.classList.add("modal", "fade");
        reviewDiv.setAttribute("id", "reviewModal");
        reviewDiv.setAttribute("tabindex", "-1");
        reviewDiv.setAttribute("aria-label", "reviewModalLabel");
        reviewDiv.setAttribute("aria-hidden", "true");

        let modalDialog = document.createElement("div");
        modalDialog.classList.add("modal-dialog");

        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        let modalHead = document.createElement("div");
        modalHead.classList.add("modal-header");

        let modalEscape = document.createElement("button");
        modalEscape.setAttribute("type", "button");
        modalEscape.setAttribute("data-dismiss", "modal");
        modalEscape.setAttribute("aria-label", "Close");
        modalEscape.classList.add("close");
        modalEscape.innerText = "x";

        let modalTitle = document.createElement("h4");
        modalTitle.classList.add("modal-title");
        modalTitle.innerText = "Create Review";

        modalHead.appendChild(modalTitle);
        modalHead.appendChild(modalEscape);

        let modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");

        let reviewForm = document.createElement("form")
        reviewForm.setAttribute("id", "reviewForm")
        reviewForm.setAttribute("aria-hidden", "true")
        
        let usernameInput = document.createElement("div")
        usernameInput.classList.add("form-group")
        usernameInput.innerHTML = "<label for='username'>Nickname: </label>";
        usernameInput.innerHTML += "<input type='text' id='username' class='form-control' name='username'>";

        let contentInput = document.createElement("div");
        contentInput.classList.add("form-group");
        contentInput.innerHTML = "<label for='content'>Review: </label>";
        contentInput.innerHTML += "<textarea id='content' class='form-control' name='content'></textarea>";

        let recommendInput = document.createElement("div");
        recommendInput.classList.add("form-group", "custome-control", "custom-switch");
        recommendInput.innerHTML = "<input type='checkbox' id='recommend' class='form-control custom-control-input' name='recommend' value='true'>";
        recommendInput.innerHTML += "<label class='custom-control-label' for='recommend'> Recommend</label>"
    
        reviewForm.appendChild(usernameInput);
        reviewForm.appendChild(contentInput);
        reviewForm.appendChild(recommendInput);
        modalBody.appendChild(reviewForm)

        let modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");

        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("type", "button");
        submitBtn.setAttribute("data-dismiss", "modal");
        submitBtn.classList.add("btn", "btn-primary");
        submitBtn.innerText = "Create Review"
        submitBtn.addEventListener("click", function(e) {
            Review.addReview(reviewsContainer, reviewForm);
        })

        modalFooter.appendChild(submitBtn);

        modalContent.appendChild(modalHead);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modalDialog.appendChild(modalContent);
        reviewDiv.appendChild(modalDialog);

        reviewsContainer.parentNode.appendChild(reviewDiv);
    }

    renderReview(reviewsContainer) {
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
        reviewsContainer.appendChild(div);
    }

    static createReviews(reviewData) {
        reviewData.forEach(data => Review.create(data.id, data.username, data.content, data.recommend, data.wine_id));
    }

    static create(id, username, content, recommend, wine_id) {
        let review = new Review(id, username, content, recommend, wine_id);
        if (!Review.all.map(review => review.id).includes(review.id)) {
            Review.all.push(review);
            return review;
        }
    }

    static addReview(reviewsContainer, reviewForm) {
        const usernameInputValue = reviewForm.querySelector("input#username").value
        const contentInputValue = reviewForm.querySelector("textarea#content").value
        const recommendInputValue = reviewForm.querySelector("input#recommend").checked
        
        
        const strongParams = {
            review: {
                username: usernameInputValue,
                content: contentInputValue,
                recommend: recommendInputValue,
                wine_id: reviewsContainer.parentNode.id
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
            review.renderReview(reviewsContainer);

            reviewForm.querySelector("input#username").value = ""
            reviewForm.querySelector("textarea#content").value = ""
            reviewForm.querySelector("input#recommend").value = ""
        })
        .catch(errors => console.log(errors))
    }

    static destroyReview(e) {
        const review = e.target.parentNode
        const reviewParent = e.target.parentNode.parentNode

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
            review.remove();
            Review.all = Review.all.filter(review => data.id !== review.id);
            Review.displayReviews(reviewParent)
        })
    }

    static displayReviews(reviewsContainer) {
        reviewsContainer.innerText = "";
        let reviews = Review.all.filter(review => review.wine_id == reviewsContainer.parentNode.id);
        reviews.forEach(review => review.renderReview(reviewsContainer))
    }
}