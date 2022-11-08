import {
  useCallback,
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { Header, Container, CardDetailed } from "@components";
import useMovieDB from "@hooks/useMovieDB";
import { Grid } from "@styles/Layouts.styled";
import { Movie } from "@dtypes/index";
import { MovieListResponse } from "@dtypes/responses";

const MovieDetailsModal = lazy(() => import("@modals/MovieDetailsModal"));

export const MovieContext = createContext({
  selectedMovie: 0,
  genres: [] as any[],
  setSelectedMovie: (id: number) => {},
});

const App = () => {
  const [query, setQuery] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

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

    const totalPages = query ? searchResults.total_pages : data.total_pages;
    const newMoviesResponse: MovieListResponse = query ? searchResults : data;

    setHasMore(page <= totalPages);

    const newMovies: Movie[] = newMoviesResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: movie.release_date,
      genres: [] as string[],
      rating: movie.vote_average,
      ratingCount: movie.vote_count,
      overview: movie.overview,
      poster: movie.poster_path,
    }));

    setMovies((prev) => [...(page > 1 ? prev : []), ...newMovies]);
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
    return movies
      .map((movie: any) => {
        /**
         * Issue with Movie DB sometimes responsing on different pages
         * with the same movie, thus causing issues on Virtual DOM as
         * some elements ends up having the same key.
         */
        if (ids.has(movie.id)) return undefined;
        ids.add(movie.id);

        return <CardDetailed key={movie.id} {...movie} />;
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
        <Container
          aria-disabled={true}
          onIntersect={onIntersectHandler}
          isLoading={isLoadingResults}
          layout={Grid}
        >
          {cardItems}
        </Container>
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
