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

        let usernameForm = document.createElement("div")
        usernameForm.innerHTML = "<label for='username'>Nickname: </label>";
        usernameForm.innerHTML += "<input type='text' id='username' name='username'>";

        let contentForm = document.createElement("div")
        contentForm.innerHTML = "<label for='content'>Review: </label>";
        contentForm.innerHTML += "<textarea id='content' name='content'></textarea>";

        let recommendForm = document.createElement("div")
        recommendForm.innerHTML = "<label for='recommend'>Recommend? </label>"
        recommendForm.innerHTML += "<input type='radio' name='recommend' value='yes'> Yes";
        recommendForm.innerHTML += "<input type='radio' name='recommend' value='no'> No";

        let submitReview = document.createElement("input")
        submitReview.setAttribute("type", "submit")
        submitReview.value = "Add Review";
        submitReview.addEventListener("click", Review.addReview) 

        reviewForm.appendChild(usernameForm);
        reviewForm.appendChild(contentForm);
        reviewForm.appendChild(recommendForm);
        reviewForm.appendChild(submitReview);
        div.appendChild(reviewForm);
    }

    static addReview() {
        
    }
}