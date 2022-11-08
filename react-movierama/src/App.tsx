import {
  useCallback,
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
} from "react";
import Header from "./components/Header";
import useMovieDB from "./hooks/useMovieDB";
import MovieContainer from "./components/MovieContainer";
import { Grid } from "./components/styles/Layouts.styled";

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

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [selectedMovie]);

  return (
    <MovieContext.Provider
      value={{ selectedMovie, setSelectedMovie, genres: genres?.genres || [] }}
    >
      <div className="App">
        <Header query={query} setQuery={onChangeHandler} />
        <MovieContainer
          movies={movies}
          infinite={true}
          onIntersect={setPage}
          hasMore={hasMore}
          Layout={Grid}
        />
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
