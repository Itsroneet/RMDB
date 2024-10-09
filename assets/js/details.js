document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5a41a4ff0e4bfcc5608165fe4ae559ed';
    const movieDetailsContainer = document.getElementById('movie-details');
    const relatedImagesContainer = document.getElementById('related-images');
    const trailerModal = document.getElementById('trailer-modal');
    const closeTrailerBtn = document.getElementById('close-trailer');
    const trailerVideo = document.getElementById('trailer-video');
    const iderror = document.querySelector('.movie-id');
    let loader = document.querySelector(".loading-spinner")


    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    function showLoadingSpinner() {
        loader.style.display = "block"
    }

    function hideLoadingSpinner() {
        loader.style.display = "none";
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
               hideLoadingSpinner()
                   });
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
        let currentIndex = 0;
        const totalImages = Math.min(images.length, 10);
    
        // Render small carousel
        let relatedImagesHTML = '<h3>Related Images</h3><div class="small-carousel-wrapper">';
        relatedImagesHTML += `
            <button class="carousel-control left small-carousel-control">&lsaquo;</button>
            <div class="small-carousel">
        `;
        
        images.slice(0, totalImages).forEach((image, index) => {
            relatedImagesHTML += `<img class="small-carousel-image" src="https://image.tmdb.org/t/p/w300${image.file_path}" alt="Related Image" data-index="${index}">`;
        });
    
        relatedImagesHTML += `
            </div>
            <button class="carousel-control right small-carousel-control">&rsaquo;</button>
        </div>`;
        
        relatedImagesContainer.innerHTML = relatedImagesHTML;
    
        // Render modal for big carousel
        const modalHTML = `
            <div id="imageModal" class="modal">
                <span class="close">&times;</span>
                <div class="modal-content-container">
                    <div class="image-wrapper">
                        <img id="modalImage" class="modal-content">
                    </div>
                    <div class="counter"><span id="currentImageIndex">1</span> / ${totalImages}</div>
                </div>
                <button id="leftControl" class="carousel-control left">&lsaquo;</button>
                <button id="rightControl" class="carousel-control right">&rsaquo;</button>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
        const closeModal = document.querySelector(".close");
        const leftControl = document.getElementById("leftControl");
        const rightControl = document.getElementById("rightControl");
        const currentImageIndexElem = document.getElementById('currentImageIndex');
        const smallCarousel = document.querySelector('.small-carousel');
        const smallLeftControl = document.querySelector('.small-carousel-control.left');
        const smallRightControl = document.querySelector('.small-carousel-control.right');
        const smallCarouselImages = document.querySelectorAll('.small-carousel-image');
    
        let scrollPosition = 0;
    
        // Small carousel scroll buttons
        smallRightControl.addEventListener('click', () => {
            scrollPosition += 150;
            smallCarousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
        
        smallLeftControl.addEventListener('click', () => {
            scrollPosition -= 150;
            smallCarousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
    
        // Show big carousel (modal) when clicking on small carousel image
        smallCarouselImages.forEach((imageElement) => {
            imageElement.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                showBigCarousel(parseInt(index, 10));
            });
        });
    
        // Function to show big carousel
        function showBigCarousel(index) {
            currentIndex = index;
            modal.style.display = "grid";
            updateBigCarouselImage();
            document.querySelector(".nav").style.display = "none"; // Hide nav bar
            disableScroll();
        }
    
        // Function to update the big carousel image
        function updateBigCarouselImage() {
            modalImage.src = `https://image.tmdb.org/t/p/original${images[currentIndex].file_path}`;
            currentImageIndexElem.textContent = currentIndex + 1;
        }
    
        // Close the modal
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
            document.querySelector(".nav").style.display = "flex"; // Show nav bar
            enableScroll();
        });
    
        // Left control (Previous image)
        leftControl.addEventListener('click', () => {
            if (currentIndex === 0) {
                currentIndex = totalImages - 1;
            } else {
                currentIndex -= 1;
            }
            updateBigCarouselImage();
        });
    
        // Right control (Next image)
        rightControl.addEventListener('click', () => {
            if (currentIndex === totalImages - 1) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
            updateBigCarouselImage();
        });
    
        // Disable page scroll when modal is open
        function disableScroll() {
            document.body.style.overflow = 'hidden';
        }
    
        // Enable page scroll when modal is closed
        function enableScroll() {
            document.body.style.overflow = '';
        }
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
