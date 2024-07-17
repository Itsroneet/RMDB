document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a41a4ff0e4bfcc5608165fe4ae559ed';
    const loadingSpinner = document.getElementById('loading-spinner');
    const movieDetailsContainer = document.getElementById('movie-details');
    const relatedImagesContainer = document.getElementById('related-images');
    const trailerModal = document.getElementById('trailer-modal');
    const closeTrailerBtn = document.getElementById('close-trailer');
    const trailerVideo = document.getElementById('trailer-video');
    const error = document.querySelector('.error');
    const iderror = document.querySelector('.movie-id');


    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    function showLoadingSpinner() {
        loadingSpinner.style.display = 'block';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
    }

    function fetchMovieDetails() {
        showLoadingSpinner();
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos,images`)
            .then(response => response.json())
            .then(data => {
                displayMovieDetails(data);
                hideLoadingSpinner();
            })
            .catch(() => {
                hideLoadingSpinner();
                error.style.display="grid";            });
    }

    function displayMovieDetails(movie) {
        document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;

        const genres = movie.genres.map(genre => genre.name).join(', ');
        const cast = movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
        const trailer = movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

        const movieDetailsHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p><strong>Overview:</strong> ${movie.overview}</p>
                <div class="info">
                    <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    <p><strong>Rating:</strong> ${movie.vote_average}</p>
                    <p><strong>Genres:</strong> ${genres}</p>
                    <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                    <p><strong>Cast:</strong> ${cast}</p>
                </div>
                ${trailer ? `<button id="view-trailer" class="btn btn-1">View Trailer</button>` : ''}
            </div>
        `;
        movieDetailsContainer.innerHTML = movieDetailsHTML;
        movieDetailsContainer.classList.add('active');

        if (trailer) {
            document.getElementById('view-trailer').addEventListener('click', () => {
                trailerVideo.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
                trailerModal.style.display = 'flex';
            });
        }

        displayRelatedImages(movie.images.backdrops);
    }

    function displayRelatedImages(images) {
        let relatedImagesHTML = '<h3>Related Images</h3><div class="carousel">';
        images.slice(0, 10).forEach(image => {
            relatedImagesHTML += `<img src="https://image.tmdb.org/t/p/w300${image.file_path}" alt="Related Image">`;
        });
        relatedImagesHTML += '</div>';
        relatedImagesHTML += `
            <button class="carousel-control left">&lsaquo;</button>
            <button class="carousel-control right">&rsaquo;</button>
        `;
        relatedImagesContainer.innerHTML = relatedImagesHTML;

        const carousel = document.querySelector('.carousel');
        const leftControl = document.querySelector('.carousel-control.left');
        const rightControl = document.querySelector('.carousel-control.right');
        let scrollAmount = 0;

        rightControl.addEventListener('click', () => {
            scrollAmount += 150;
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        leftControl.addEventListener('click', () => {
            scrollAmount -= 150;
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    closeTrailerBtn.addEventListener('click', () => {
        trailerVideo.src = '';
        trailerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === trailerModal) {
            trailerVideo.src = '';
            trailerModal.style.display = 'none';
        }
    });

    if (movieId) {
        fetchMovieDetails();
    } else {   
        iderror.style.display="block"; 
    }
});

