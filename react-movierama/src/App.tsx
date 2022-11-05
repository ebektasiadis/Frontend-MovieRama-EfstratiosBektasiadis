import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import useMovieDB from "./hooks/useMovieDB";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const { useFetchNowPlaying } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const { isLoading, data, hasMore, fetchNext } = useFetchNowPlaying();
  const observer: any = useRef();

  const lastMovieRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNext();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchNext]
  );

  useEffect(() => {
    if (isLoading) return;
    setMovies((prev) => [...prev, ...(data || [])]);
  }, [data]);

  const getMovieTitles = () => {
    return movies.map((movie: any, index: number) => (
      <h1
        ref={movies.length === index + 1 ? lastMovieRef : undefined}
        key={movie.id}
      >
        {movie.title}
      </h1>
    ));
  };

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} />
      {getMovieTitles()}
    </div>
  );
}

export default App;
