import { useCallback, useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import useMovieDB from "./hooks/useMovieDB";
import MovieContainer from "./components/MovieContainer";
import MovieDetailsModal from "./components/modals/MovieDetailsModal";

export const MovieContext = createContext({
  selectedMovie: 0,
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

  const { useFetchNowPlaying, useFetchSearchResults } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const { data, isLoading } = useFetchNowPlaying(page);
  const { data: searchResults, isLoading: isLoadingSearchResults } =
    useFetchSearchResults(page, toSearch);

  useEffect(() => {
    if ((query && isLoadingSearchResults) || (!query && isLoading)) return;
    setHasMore(page <= (query ? searchResults.total_pages : data.total_pages));
    setMovies((prev) => [
      ...(page > 1 ? prev : []),
      ...(query ? searchResults.results : data.results),
    ]);
  }, [isLoading, isLoadingSearchResults, page, query, data, searchResults]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
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
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      <div className="App">
        <Header query={query} setQuery={onChangeHandler} />
        <MovieContainer
          movies={movies}
          infinite={true}
          onIntersect={setPage}
          hasMore={hasMore}
        />
        {selectedMovie ? (
          <MovieDetailsModal
            movieId={selectedMovie}
            onHide={() => setSelectedMovie(0)}
          ></MovieDetailsModal>
        ) : null}
      </div>
    </MovieContext.Provider>
  );
};

export default App;
