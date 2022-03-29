const apiKey = 'ff6bd460';
const noImg = "assets/noimg.jpg";

let moviesList;
let movies;
let movieTitleByUser = localStorage.getItem("movieTitle");
let firstNineMovies;

async function renderMovies(filter){
    const loadingState = document.querySelector(".loading__container");
    const hideMovies = document.querySelector(".movies__wrapper");
    
    loadingState.classList += " movies__loading";
    hideMovies.classList += " hide__movies";

    if(!movies && (movieTitleByUser !== null)){
        movies = await getMovies(filter);
      }
    else{
        moviesDataHTML = `<div class="start--movies">
        <h2 class="start--movies__title">Get started, find movie</h2>
        <figure class="start--movies__wrapper">
            <img src="assets/startmovies.png" alt="">
        </figure>
        </div>`;
    }

    loadingState.classList.remove("movies__loading");
    hideMovies.classList.remove("hide__movies");

    const moviesContainer = document.querySelector(".movies__wrapper");
    moviesContainer.innerHTML = moviesDataHTML;
  
    if(movieTitleByUser !== null){
          document.querySelector(".search__info").innerHTML = "Search Result: " + movieTitleByUser;
      }
}

async function getMovies(filter){
    movies = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitleByUser}`);

    const moviesData = await movies.json();
    moviesList = moviesData["Search"];

    if(!moviesList){
        moviesDataHTML = `<div class="no-result">
        <h2 class="no-result__title">Sorry, we couldn't find what you were looking for.</h2>
        <figure class="no-result__img--wrapper">
            <img src="assets/no-result.png" alt="no result icon">
        </figure>
        </div>`;
        return;
    }else if(moviesList.length >= 9){
        firstNineMovies = moviesData.Search.slice(0,9);
    } else {
        firstNineMovies = moviesData.Search.slice(0,moviesList.length);
    }

    if(filter === "BY_NAME_A-Z"){
        firstNineMovies.sort(function(a, b) {
            return a.Title.localeCompare(b.Title);
        });
    }else if(filter === "BY_NAME_Z-A"){
        firstNineMovies.sort(function(a, b) {
            return b.Title.localeCompare(a.Title);
        });
    }else if(filter === "Year"){
        firstNineMovies.sort(function(a, b) {
            return a.Year.localeCompare(b.Year);
        });
    }

    moviesDataHTML = firstNineMovies.map((movie) => movieHTML(movie)).join("");
    
}


renderMovies();

function showMoviesByClick() {
    movieTitleByUser = document.querySelector('.search-bar').value;
    renderMovies()
}

function showMoviesByEnter(event){
    if(event.key === "Enter"){
        movieTitleByUser = event.target.value;
        renderMovies()
    }
}

function movieHTML(movie){
    return `<div class="movie__container">
    <div class="movie">
        <figure class="movie__img--wrapper">
            <img class="movie__img click__not-implemented" src="${movie.Poster !== "N/A" ? movie.Poster : noImg}" alt="">
        </figure>
        <div class="movie__body">
            <span class="movie__title">${movie.Title}</span>
            <span class="movie__year">Production: ${movie.Year}</span>
        </div>
    </div>
    <div class="movie__button--wrapper">
        <button class="movie__button click__not-implemented">Watch now</button>
    </div>
    </div>`;
}

function noSearchResultHTML(){
    return `<div class="no-result">
    <h2 class="no-result__title">Sorry, we couldn't find what you were looking for.</h2>
    <figure class="no-result__img--wrapper">
        <img src="assets/no-result.png" alt="no result icon">
    </figure>
    </div>`;
}


function filterMovies(event){
    renderMovies(event.target.value);
}

