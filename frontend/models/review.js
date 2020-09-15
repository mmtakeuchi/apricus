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

        reviewForm.appendChild(usernameForm);
        reviewForm.appendChild(contentForm);
        div.appendChild(reviewForm);
    }
}