import {
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
  useReducer,
} from "react";
import { Header } from "@components";
import useMovieDB from "@hooks/useMovieDB";
import SearchResults from "./components/SearchResults";

const MovieDetailsModal = lazy(() => import("@modals/MovieDetailsModal"));

const DEBOUNCING_MS = 300;

export const MovieContext = createContext({
  selectedMovie: 0,
  setSelectedMovie: (id: number) => {},
});

type State = {
  page: number;
  searchQuery: string;
};

enum ActionType {
  UpdateSearchQuery = "UPDATE_SEARCH_QUERY",
  SetPage = "SET_PAGE",
}

type Action = {
  type: ActionType;
  payload?: any;
};

const initialState: State = {
  page: 1,
  searchQuery: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UpdateSearchQuery:
      return { ...state, page: 1, searchQuery: action.payload };
    case ActionType.SetPage:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

const requestUpdateSearchQuery = (searchQuery: string): Action => ({
  type: ActionType.UpdateSearchQuery,
  payload: searchQuery,
});

const requestSetPage = (page: number): Action => ({
  type: ActionType.SetPage,
  payload: page,
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
    isLoading: query ? srLoading : npLoading,
    isError: query ? srError : npError,
    data: query ? searchResults : nowPlayingResults,
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
