const DEBOUNCE_MS = 300;

let searchInput, movieContainer, movieDb, getMovies, timer, genreMap;

const movieContainerIntersectionObserver = new IntersectionObserver(
  (entries) => {
    let lastMovieCard = entries[0];
    if (!lastMovieCard.isIntersecting) return;
    addMoviesToMovieContainer();
  }
);

const main = async () => {
  genreMap = await movieDb.getGenres();
  addMoviesToMovieContainer();
};

window.addEventListener("DOMContentLoaded", () => {
  searchInput = document.getElementById("search-input");
  movieContainer = document.getElementById("movie-container");
  movieDb = movieDbFactory("bc50218d91157b1ba4f142ef7baaa6a0");
  getMovies = () => movieDb.getNowPlaying();

  window.addEventListener("keydown", (event) => {
    if (
      event.code === "F3" ||
      ((event.ctrlKey || event.metaKey) && event.code === "KeyF")
    ) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  //search functionality
  searchInput.addEventListener("keyup", (event) => {
    //debouncing users' input
    clearTimeout(timer);
    timer = setTimeout(() => {
      const query = event.target.value;

      updateMovieSource(query);
      emptyContainer(movieContainer);
      addMoviesToMovieContainer();
    }, DEBOUNCE_MS);
  });

  main();
});
