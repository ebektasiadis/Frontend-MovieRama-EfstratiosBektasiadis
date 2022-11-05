const mapDataToCardProps = (data) => ({
  id: data.id,
  poster: data.poster_path,
  modalRef: data.modalRef || undefined,
});

const cardFactory = (props) => {
  const { fields, ref } = componentFactory("card");

  ref.addEventListener("click", async () => {
    let data = await movieDb.getMovieById(props.id, true);
    if (props.modalRef) {
      props.modalRef();
    }
    modalFactory(mapDataToModalProps(data)).render();
  });

  const render = (parent) => {
    const { poster } = fields;

    poster.addEventListener("error", (event) => {
      event.target.src = "images/movie-poster-placeholder.png";
    });

    poster.src = `https://image.tmdb.org/t/p/w200${props.poster}`;
    poster.alt = `${props.title} cover`;

    ref.setAttribute("data-movie-id", props.id);
    ref.setAttribute("aria-label", props.title);

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
