const predefinedMovies = [
  { name: "Avengers: Endgame", category: "Action" },
  { name: "Inception", category: "Sci-Fi" },
  { name: "Titanic", category: "Romance" },
  { name: "The Conjuring", category: "Horror" }
];

function populateSelectBoxes() {
  const movieSelect = document.getElementById('movieSelect');
  const categorySelect = document.getElementById('categorySelect');

  predefinedMovies.forEach((movie, index) => {
    const movieOption = document.createElement('option');
    movieOption.value = `predefined-${index}`;
    movieOption.textContent = movie.name;
    movieSelect.appendChild(movieOption);
  });

  const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
  movieList.forEach((movie, index) => {
    const movieOption = document.createElement('option');
    movieOption.value = `user-${index}`;
    movieOption.textContent = movie.movie;
    movieSelect.appendChild(movieOption);
  });

  movieSelect.addEventListener('change', () => {
    const selectedMovieIndex = movieSelect.value;
    const movieCategory = getMovieCategory(selectedMovieIndex);
    if (movieCategory) {
      categorySelect.innerHTML = `<option>${movieCategory}</option>`;
    }
  });

  loadMovies();
}

function getMovieCategory(optionValue) {
  if (optionValue.startsWith('predefined-')) {
    const index = parseInt(optionValue.replace('predefined-', ''), 10);
    return predefinedMovies[index].category;
  } else if (optionValue.startsWith('user-')) {
    const index = parseInt(optionValue.replace('user-', ''), 10);
    const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
    return movieList[index].category;
  }
  return null;
}

function loadMovies() {
  const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
  const movieDetails = document.getElementById('movieDetails');
  movieDetails.innerHTML = '';

  movieList.forEach(movie => {
    const listItem = document.createElement('div');
    listItem.classList.add('movie-item');
    listItem.innerHTML = `
      <p><strong>Movie:</strong> ${movie.movie}</p>
      <p><strong>Category:</strong> ${movie.category}</p>
      <p><strong>Watch Date:</strong> ${movie.watchDate}</p>
      <p><strong>Duration:</strong> ${movie.duration} minutes</p>
      <p><strong>Rating:</strong> ${movie.rating}/5</p>
    `;
    movieDetails.appendChild(listItem);
  });
}

document.getElementById('submit').addEventListener('click', () => {
  const movieSelect = document.getElementById('movieSelect');
  const categorySelect = document.getElementById('categorySelect');
  const watchDate = document.getElementById('watchDate').value;
  const movieDuration = document.getElementById('movieDuration').value;
  const movieRating = document.getElementById('movieRating').value;

  if (movieSelect.value === "" || watchDate === "" || movieDuration === "" || movieRating === "") {
    alert("Please fill in all the fields.");
    return;
  }

  const selectedMovieIndex = movieSelect.value;
  const movieData = {
    movie: getMovieName(selectedMovieIndex),
    category: getMovieCategory(selectedMovieIndex),
    watchDate: watchDate,
    duration: movieDuration,
    rating: movieRating
  };

  let movieList = JSON.parse(localStorage.getItem('movieList')) || [];
  movieList.push(movieData);
  localStorage.setItem('movieList', JSON.stringify(movieList));

  document.getElementById('movieForm').reset();
  categorySelect.innerHTML = `<option selected>Select Category</option>`;
  loadMovies();
});

function getMovieName(optionValue) {
  if (optionValue.startsWith('predefined-')) {
    const index = parseInt(optionValue.replace('predefined-', ''), 10);
    return predefinedMovies[index].name;
  } else if (optionValue.startsWith('user-')) {
    const index = parseInt(optionValue.replace('user-', ''), 10);
    const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
    return movieList[index].movie;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', populateSelectBoxes);
