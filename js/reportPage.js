function populateCategorySelect() {
    const reportCategorySelect = document.getElementById('reportCategorySelect');
    const categories = [];
  
    const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
  
    movieList.forEach(movie => {
      if (!categories.includes(movie.category)) {
        categories.push(movie.category);
      }
    });
  
    categories.forEach(category => {
      const categoryOption = document.createElement('option');
      categoryOption.value = category;
      categoryOption.textContent = category;
      reportCategorySelect.appendChild(categoryOption);
    });
  }
  
  function generateReport() {
    const selectedCategory = document.getElementById('reportCategorySelect').value;
    const reportResults = document.getElementById('reportResults');
    
    reportResults.innerHTML = '';
  
    if (selectedCategory === 'Select Category') {
      alert('Please select a category.');
      return;
    }
  
    const movieList = JSON.parse(localStorage.getItem('movieList')) || [];
  
    const filteredMovies = movieList.filter(movie => movie.category === selectedCategory);
  
    let totalTime = 0;
    if (filteredMovies.length > 0) {
      const ul = document.createElement('ul');
      ul.classList.add('list-group');
  
      filteredMovies.forEach(movie => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `Movie: ${movie.movie}, Watch Date: ${movie.watchDate}, Duration: ${movie.duration} minutes, Rating: ${movie.rating}/5`;
        ul.appendChild(li);
        
        totalTime += parseInt(movie.duration);
      });
  
      reportResults.appendChild(ul);
  
      const totalWatchTime = document.createElement('p');
      totalWatchTime.innerHTML = `<strong>Total Watch Time for ${selectedCategory}: ${totalTime} minutes</strong>`;
      reportResults.appendChild(totalWatchTime);
    } else {
      reportResults.innerHTML = `<p>No movies found for the selected category.</p>`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    populateCategorySelect();
  
    document.getElementById('generateReport').addEventListener('click', generateReport);
  });
  