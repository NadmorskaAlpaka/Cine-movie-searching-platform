const apiKey = 'ff6bd460';
const title = 'Iron man';
let movieByUser = "";

async function loadMovies(){
    const movies = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);
    const moviesData = await movies.json();
    const firstThreeMovies = moviesData.Search.slice(0,3);
    const movieDataHtml = document.querySelector(".featured__movies--wrapper");
    movieDataHtml.innerHTML = firstThreeMovies.map((movie) => movieHTML(movie)).join('');
}


function showMoviesByClick() {
    movieByUser = document.querySelector('.search-bar').value;

    if(movieByUser !== ""){
        localStorage.setItem("movieTitle",movieByUser);
        window.location.href=`${window.location.origin}/movies.html`;
    } else if(movieByUser === ""){
        alert("Field cannot be empty");
    }
}

function showMoviesByEnter(event){
    if(event.key === "Enter" && event.target.value !== ""){
        movieByUser = event.target.value;
        localStorage.setItem("movieTitle",movieByUser);
        window.location.href=`${window.location.origin}/movies.html`;
    }else if(event.key === "Enter" && event.target.value === ""){
        alert("Field cannot be empty");
    }
}

function movieHTML(movie){
    return `<div class="movie__container">
    <div class="movie">
        <figure class="movie__img--wrapper">
            <img class="movie__img not-implemented" src="${movie.Poster}" alt="">
        </figure>
        <div class="movie__body">
            <span class="movie__title">${movie.Title}</span>
            <span class="movie__year">Production: ${movie.Year}</span>
        </div>
    </div>
    <div class="movie__button--wrapper">
        <button class="movie__button click__not-implemented">Watch now</button>
    </div>
    </div>`
}

loadMovies();