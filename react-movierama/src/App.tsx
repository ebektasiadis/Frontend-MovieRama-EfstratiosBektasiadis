import {
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
  useReducer,
} from "react";
import { Header, SearchResults } from "@components";
import useMovieDB from "@hooks/useMovieDB";
import {
  searchResultsReducer as reducer,
  searchResultsInitialState as initialState,
} from "./reducers/searchResultsReducer";
import {
  requestSetPage,
  requestUpdateSearchQuery,
} from "./actions/searchResultsActions";

const MovieDetailsModal = lazy(() => import("@modals/MovieDetailsModal"));

const DEBOUNCING_MS = 300;

export const MovieContext = createContext({
  selectedMovie: 0,
  setSelectedMovie: (id: number) => {},
});

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(0);

  const [{ page, searchQuery }, dispatch] = useReducer(reducer, initialState);

  const { useFetchNowPlaying, useFetchSearchResults } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const {
    data: nowPlayingResults,
    isLoading: npLoading,
    isError: npError,
  } = useFetchNowPlaying(page, page >= 1 && !searchQuery.length);

  const {
    data: searchResults,
    isLoading: srLoading,
    isError: srError,
  } = useFetchSearchResults(page, searchQuery, searchQuery.length > 0);

  const results = {
    isLoading: searchQuery ? srLoading : npLoading,
    isError: searchQuery ? srError : npError,
    data: searchQuery ? searchResults : nowPlayingResults,
  };

  /**
   * Debouncing users input
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(requestUpdateSearchQuery(query));
      window.scrollTo({ top: 0, left: 0 });
    }, DEBOUNCING_MS);
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

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} />
      <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
        <SearchResults
          setPage={(page: number) => dispatch(requestSetPage(page))}
          {...results}
        />
        {selectedMovie ? (
          <Suspense fallback={"Fetching"}>
            <MovieDetailsModal
              movieId={selectedMovie}
              onHide={() => setSelectedMovie(0)}
            ></MovieDetailsModal>
          </Suspense>
        ) : null}
      </MovieContext.Provider>
    </div>
  );
};

export default App;
