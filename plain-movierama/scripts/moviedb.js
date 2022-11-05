const movieDbFactory = (apiKey) => {
  const AVAILABLE_MOVIE_RESOURCES = ["videos", "reviews", "similar"];
  const BASE_URL = "https://api.themoviedb.org/3";

  let page = 1,
    isDone = false,
    genres;

  const resetPages = () => {
    page = 1;
    isDone = false;
  };

  const getGenres = async () => {
    if (genres) return genres;

    const url = `${BASE_URL}/genre/movie/list`;
    const urlParams = new URLSearchParams({
      api_key: apiKey,
    });

    try {
      const response = await fetch(`${url}?${urlParams}`);
      const data = await response.json();

      // Turning response into a map for better search complexity
      let genresMap = new Map();
      data.genres?.map(({ id, name }) => genresMap.set(id, name));
      genres = genresMap;

      return genres;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getNowPlaying = async () => {
    if (isDone) return false;

    const url = `${BASE_URL}/movie/now_playing`;
    const urlParams = new URLSearchParams({
      api_key: apiKey,
      page: page,
    });

    try {
      const response = await fetch(`${url}?${urlParams}`);
      const data = await response.json();

      if (data.total_pages === page++) isDone = true;

      return data.results;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getMovieByQuery = async (query) => {
    if (isDone) return false;

    const url = `${BASE_URL}/search/movie`;
    const urlParams = new URLSearchParams({
      api_key: apiKey,
      page: page,
      query: query,
    });

    try {
      const response = await fetch(`${url}?${urlParams}`);
      const data = await response.json();

      if (data.total_pages === page++) isDone = true;

      return data.results;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getMovieById = async (movieId, allResources = false) => {
    if (Number.isNaN(movieId)) return false;

    try {
      const url = `${BASE_URL}/movie/${movieId}`;
      const urlParams = new URLSearchParams({
        api_key: apiKey,
      });

      const response = await fetch(`${url}?${urlParams}`);
      let data = await response.json();

      if (allResources) {
        for (const resource of AVAILABLE_MOVIE_RESOURCES) {
          data[resource] = await getMovieExtraResources(movieId, resource);
        }
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getMovieExtraResources = async (movieId, resource) => {
    if (Number.isNaN(movieId)) return false;
    if (!AVAILABLE_MOVIE_RESOURCES.includes(resource)) return false;

    try {
      const url = `${BASE_URL}/movie/${movieId}/${resource}`;
      const urlParams = new URLSearchParams({
        api_key: apiKey,
      });

      const response = await fetch(`${url}?${urlParams}`);
      const data = await response.json();

      return data.results;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    resetPages,
    getGenres,
    getNowPlaying,
    getMovieById,
    getMovieByQuery,
    getMovieExtraResources,
  };
};
