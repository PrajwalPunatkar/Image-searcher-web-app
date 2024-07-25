const accesskey = "EnMbycnwQu5bNaJayJbitJjaWMnmrIY67PYYM32qD50";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button"); // Corrected

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value; // Corrected
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("box"); // Corrected
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank"; // Corrected
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); // Corrected
    });

    page++;
    if (page > 2)
        showMore.style.display = "block"; // Corrected
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
