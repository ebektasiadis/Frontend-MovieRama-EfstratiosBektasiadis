import {
  useCallback,
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
  useMemo,
} from "react";
import Header from "./components/Header";
import useMovieDB from "./hooks/useMovieDB";
import MovieContainer from "./components/Container";
import { Grid } from "./components/styles/Layouts.styled";
import CardDetailed from "./components/CardDetailed";

const MovieDetailsModal = lazy(
  () => import("./components/modals/MovieDetailsModal")
);

export const MovieContext = createContext({
  selectedMovie: 0,
  genres: [],
  setSelectedMovie: (id: number) => {},
});

const App = () => {
  const [query, setQuery] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);

  const [selectedMovie, setSelectedMovie] = useState(0);

  const onChangeHandler = useCallback((query: string) => setQuery(query), []);

  const { useFetchNowPlaying, useFetchSearchResults, useFetchGenres } =
    useMovieDB(process.env.REACT_APP_MOVIEDB_API_KEY || "");

  const { data, isLoading, isError } = useFetchNowPlaying(
    page,
    page >= 1 && !query.length && hasMore
  );
  const {
    data: searchResults,
    isLoading: isLoadingSearchResults,
    isError: isErrorSearchResults,
  } = useFetchSearchResults(page, toSearch, query.length > 0 && hasMore);

  const isLoadingResults =
    (query && isLoadingSearchResults) || (!query && isLoading);

  const { data: genres } = useFetchGenres();

  useEffect(() => {
    if (
      (query && (isLoadingSearchResults || isErrorSearchResults)) ||
      (!query && (isLoading || isError))
    )
      return;
    setHasMore(page <= (query ? searchResults.total_pages : data.total_pages));
    setMovies((prev) => [
      ...(page > 1 ? prev : []),
      ...(query ? searchResults.results : data.results),
    ]);
  }, [
    isLoading,
    isLoadingSearchResults,
    page,
    query,
    data,
    searchResults,
    isError,
    isErrorSearchResults,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      setToSearch(query);
      window.scrollTo({ top: 0, left: 0 });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  /**
   * Disables background scroll (document) when a modal is open.
   * Should be replaced with a better approach
   */
  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [selectedMovie]);

  const cardItems = useMemo(() => {
    const ids = new Set();
    if (!movies) return [];
    console.log(movies);
    return movies
      .map((movie: any) => {
        /**
         * Issue with Movie DB sometimes responsing on different pages
         * with the same movie, thus causing issues on Virtual DOM as
         * some elements ends up having the same key.
         */
        if (ids.has(movie.id)) return undefined;
        ids.add(movie.id);

        return (
          <CardDetailed
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            releaseYear={movie.release_date}
            genres={movie.genre_ids}
            rating={movie.vote_average}
            ratingCount={movie.vote_count}
            overview={movie.overview}
          />
        );
      })
      .filter((card: any) => card !== undefined);
  }, [movies]);

  const onIntersectHandler = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <MovieContext.Provider
      value={{ selectedMovie, setSelectedMovie, genres: genres?.genres || [] }}
    >
      <div className="App">
        <Header query={query} setQuery={onChangeHandler} />
        <MovieContainer
          onIntersect={onIntersectHandler}
          isLoading={isLoadingResults}
          Layout={Grid}
        >
          {cardItems}
        </MovieContainer>
        {selectedMovie ? (
          <Suspense fallback={"Fetching"}>
            <MovieDetailsModal
              movieId={selectedMovie}
              onHide={() => setSelectedMovie(0)}
            ></MovieDetailsModal>
          </Suspense>
        ) : null}
      </div>
    </MovieContext.Provider>
  );
};

export default App;
