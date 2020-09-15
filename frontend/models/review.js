class Review {

    static all = [];

    constructor(id, username, content, recommend) {
        this.id = id;
        this.username = username;
        this.content = content;
        this.recommend = recommend
    }

    static createReviewForm() {
        let div = this.parentElement;
        console.log(div)

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
        recommendInput.innerHTML += "<input type='radio' name='recommend' value='yes'> Yes";
        recommendInput.innerHTML += "<input type='radio' name='recommend' value='no'> No";

        let submitReview = document.createElement("input")
        submitReview.setAttribute("type", "submit")
        submitReview.value = "Add Review";
        submitReview.addEventListener("click", Review.addReview) 

        reviewForm.appendChild(usernameInput);
        reviewForm.appendChild(contentInput);
        reviewForm.appendChild(recommendInput);
        reviewForm.appendChild(submitReview);
        div.appendChild(reviewForm);
    }

    static addReview(e) {
        e.preventDefault();

        const strongParams = {
            review: {
                username: usernameInput.value,
                username: contentInput.value,
                username: recommendInput.value,
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
            let review = Review.create(data.id, data.username, data.content, data.recommend);
            review.renderReview();
        })
        .catch(errors => console.log(errors))
    }
}