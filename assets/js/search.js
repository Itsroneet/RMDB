document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a41a4ff0e4bfcc5608165fe4ae559ed';
    const resultsContainer = document.getElementById('results-container');

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetchSearchResults(query);
    }

    function fetchSearchResults(query) {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data.results);
            })
            .catch(() => {
                alert('Failed to fetch data. Please try again later.');
            });
    }

    resp = result.overview;
    resparagraph = resp.substr(0,maxLength) + '...';
    console.log(resp)
    
    function displaySearchResults(results) {
        let resultsHTML = '';
        results.forEach(result => {
            resultsHTML += `
                <div class="search-result-item">
                    <a href="details.html?movieId=${result.id}">
                        <img src="https://image.tmdb.org/t/p/w300${result.poster_path}" alt="${result.title}">
                        <div id=textarea>
                        <h3>${result.title}</h3>
                        <p>${result.overview.substr(0,200) + '.......'}</p>
                        </div>
                    </a>
                </div>
            `;
        });
        resultsContainer.innerHTML = resultsHTML;
    }
});

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        window.location.href = `search.html?query=${query}`;
    }
});

const searchForm = document.getElementById('search-bar');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?query=${query}`;
        }
    });