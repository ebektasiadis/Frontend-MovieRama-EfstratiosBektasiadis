const mapDataToCardDetailedProps = (data) => ({
  id: data.id,
  poster: data.poster_path,
  title: data.title || data.original_title,
  releaseYear: data.release_date,
  genres: data.genre_ids,
  rating: data.vote_average,
  ratingCount: data.vote_count,
  overview: data.overview,
});

const cardDetailedFactory = (props) => {
  const { fields, ref } = componentFactory("card-detailed");

  const render = (parent) => {
    const { poster, title, releaseYear, genres, rating, overview } = fields;

    // Event Listeners
    poster.addEventListener("error", (event) => {
      event.target.src = "images/movie-poster-placeholder.png";
    });

    ref.addEventListener("click", async () => {
      let data = await movieDb.getMovieById(props.id, true);
      modalFactory(mapDataToModalProps(data)).render();
    });

    // Setting values to data fields
    ref.setAttribute("data-movie-id", props.id);
    ref.setAttribute("aria-label", props.title);

    poster.src = `https://image.tmdb.org/t/p/w200${props.poster}`;
    poster.alt = `${props.title} cover`;
    title.innerText = props.title;
    releaseYear.innerText = `Released at ${formatDate(props.releaseYear)}`;
    const genreListItems = mapGenresToListItems(props.genres);
    genreListItems.forEach((item) => genres.appendChild(item));
    rating.innerText = `Rating: ${props.rating} / 10 (${props.ratingCount} votes)`;
    overview.innerText = props.overview;

    parent.appendChild(ref);
  };

  const unrender = () => {
    ref.remove();
  };

  return {
    render,
    unrender,
  };
};
