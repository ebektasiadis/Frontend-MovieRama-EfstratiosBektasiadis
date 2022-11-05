const mapDataToModalProps = (data) => {
  const trailer = data?.videos.find(
    ({ site, type }) => site === "YouTube" && type === "Trailer"
  )?.key;

  return {
    id: data.id,
    header: data.title,
    trailer,
    reviews: data?.reviews,
    similar: data?.similar,
  };
};

const modalFactory = (props) => {
  //do not allow 2 models to open in the same time.
  if (document.querySelector("[data-template=modal]")) {
    return;
  }

  const { fields, ref } = componentFactory("modal");
  const reviewContainer = ref.querySelector("#review-container");
  const similarContainer = ref.querySelector("#similar-container");
  const modalBody = ref.querySelector(".modal-body");

  const onEscapeHandler = (event) => {
    if (event.key === "Escape") {
      unrender();
    }
  };

  // Event Listeners
  ref.querySelector(".cross").addEventListener("click", () => unrender());
  window.addEventListener("keydown", onEscapeHandler);

  //clicking outside of modal should close the modal
  ref
    .querySelector(".modal")
    .addEventListener("click", (e) => e.stopPropagation());
  ref.addEventListener("click", () => unrender());

  similarContainer.addEventListener("mousewheel", (event) => {
    event.preventDefault();
    similarContainer.scrollLeft += event.deltaY;
  });

  if (!props.trailer) {
    modalBody.classList.add("no-trailer");
  }

  if (props.reviews && !props.reviews.length) {
    modalBody.classList.add("no-reviews");
  }

  if (props.similar && !props.similar.length) {
    modalBody.classList.add("no-similar");
  }

  if (
    [...modalBody.classList].filter((className) => className.startsWith("no-"))
      .length === 3
  ) {
    unrender();
    return;
  }

  const render = (parent = document.body) => {
    const { header, trailer } = fields;

    header.innerText = props.header;

    if (props.trailer) {
      trailer.src = `https://www.youtube.com/embed/${props.trailer}?autoplay=1&mute=1`;
    }
    props?.reviews.forEach((review) =>
      reviewFactory(mapDataToReviewProps(review)).render(reviewContainer)
    );

    props?.similar.forEach((movie) =>
      cardFactory({
        ...mapDataToCardDetailedProps(movie),
        modalRef: unrender,
      }).render(similarContainer)
    );

    document.body.classList.toggle("no-scroll");

    parent.insertBefore(ref, parent.firstChild);
  };

  const unrender = () => {
    window.removeEventListener("keydown", onEscapeHandler);
    document.body.classList.remove("no-scroll");
    ref.remove();
  };

  return {
    render,
    unrender,
  };
};
