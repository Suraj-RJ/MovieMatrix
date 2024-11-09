
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    let movname = document.getElementById("movname").value;
    let movcategory = document.getElementById("movcategory").value;

    if (movcategory !== "Select" && movname !== "") {
        let categories = JSON.parse(localStorage.getItem(movcategory)) || [];
        categories.push(movname);
        localStorage.setItem(movcategory, JSON.stringify(categories));
        ShowMovie();
        resetForm();
    }
});

const ShowMovie = () => {
    let movieNameList = document.getElementById("moviename");
    movieNameList.innerHTML = "";

    const categories = [
        "Horror", "Thriller", "Sci-F", "Fantasy", "Mystery", "Comedy", "Drama",
        "Action", "Romance", "Adventure", "Documentary", "Animation", "Musical",
        "Historical", "Supernatural", "Superhero"
    ];

    categories.forEach((category) => {
        let movies = JSON.parse(localStorage.getItem(category)) || [];
        
        movies.forEach((movie) => {
            let listItem = document.createElement("li");
            listItem.classList.add("list-group-item");
            listItem.textContent = `${movie} (${category}) `;

            let span = document.createElement("span");
            span.classList.add("badge", "text-bg-primary", "rounded-pill");
            span.textContent = "Delete";
            span.addEventListener("click", () => {
                deleteItem(category, movie);
            });

            listItem.appendChild(span);
            movieNameList.appendChild(listItem);
        });
    });
};

const resetForm = () => {
    document.getElementById("movname").value = "";
    document.getElementById("movcategory").value = "Select";
};

const deleteItem = (category, movie) => {
    let movies = JSON.parse(localStorage.getItem(category)) || [];
    movies = movies.filter((m) => m !== movie);
    localStorage.setItem(category, JSON.stringify(movies));
    ShowMovie();
};

ShowMovie();
