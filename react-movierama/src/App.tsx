import { useEffect, useState, useReducer } from "react";
import { Header, SearchResults } from "@components";
import useMovieDB from "@hooks/useMovieDB";
import { searchResults } from "@reducers";
import { searchResultsActions as actions } from "@actions";
import { MovieContext } from "@contexts";
import { DEBOUNCING_MS } from "@src/constants";

const App = () => {
  const [query, setQuery] = useState("");
  const [{ page, searchQuery }, dispatch] = useReducer(
    searchResults.reducer,
    searchResults.initialState
  );

  const { useFetchNowPlaying, useFetchSearchResults } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const {
    data: npData,
    isLoading: npLoading,
    isError: npError,
  } = useFetchNowPlaying(page, page >= 1 && !searchQuery.length);

  const {
    data: srData,
    isLoading: srLoading,
    isError: srError,
  } = useFetchSearchResults(page, searchQuery, searchQuery.length > 0);

  const results = {
    isLoading: searchQuery ? srLoading : npLoading,
    isError: searchQuery ? srError : npError,
    data: searchQuery ? srData : npData,
  };

  /**
   * Debouncing users input
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(actions.requestUpdateSearchQuery(query));
      window.scrollTo({ top: 0, left: 0 });
    }, DEBOUNCING_MS);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} isLoading={results.isLoading} />
      <MovieContext.MovieContextProvider>
        <SearchResults
          setPage={(page: number) => dispatch(actions.requestSetPage(page))}
          {...results}
        />
      </MovieContext.MovieContextProvider>
    </div>
  );
};

export default App;
