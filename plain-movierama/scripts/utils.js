const createElementFromTemplate = (template) => {
  const element = template.content.firstElementChild.cloneNode(true);
  element.setAttribute("data-template", template.id);
  return element;
};

const getDataFieldElements = (parentElement) => {
  let result = {};
  const elements = [...parentElement.querySelectorAll("[data-field-id]")];
  elements.forEach((element) => {
    const attributeValue = element.getAttribute(["data-field-id"]);
    const resultKey = kebabToLowerCamelCase(attributeValue);
    result[resultKey] = element;
  });

  return result;
};

let formatDate = (date) => {
  let localeDate = new Date(date).toLocaleString();
  return localeDate.substring(0, localeDate.indexOf(","));
};

const mapGenresToListItems = (genres) => {
  return genres
    .filter((genre) => genreMap.has(genre))
    .map((genre) => {
      const li = document.createElement("li");
      li.innerText = genreMap.get(genre);
      li.setAttribute("data-genre-id", genre);
      return li;
    });
};

const addMoviesToMovieContainer = async () => {
  if (getLastCardDetailed())
    movieContainerIntersectionObserver.unobserve(getLastCardDetailed());

  const movies = await getMovies();
  if (movies) {
    movies.forEach((movie) => {
      const cardDetailedProps = mapDataToCardDetailedProps(movie);
      cardDetailedFactory(cardDetailedProps).render(movieContainer);
    });
  }

  if (getLastCardDetailed())
    movieContainerIntersectionObserver.observe(getLastCardDetailed());
};

const emptyContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const kebabToLowerCamelCase = (value) => {
  return value.replace(/-./g, (match) => match[1].toUpperCase());
};

const getLastCardDetailed = () => {
  return document.querySelector("[data-template=card-detailed]:last-child");
};

const updateMovieSource = (query) => {
  getMovies = () =>
    query ? movieDb.getMovieByQuery(query) : movieDb.getNowPlaying();
  movieDb.resetPages();
};
