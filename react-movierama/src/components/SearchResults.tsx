import { Suspense, useEffect, useMemo, useState, lazy } from "react";
import { Movie, MovieListResponse } from "@dtypes";
import { CardDetailed, Container } from "@components";
import { LayoutStyles as Styles } from "@styles";
import { useMovieDB } from "@hooks";
import { MovieContext } from "@contexts";
import { mapResponseToMovies } from "@src/utils";

const MovieDetailsModal = lazy(() => import("@modals/MovieDetailsModal"));

interface ISearchResults {
  isLoading: boolean;
  isError: boolean;
  data: MovieListResponse;
  setPage: Function;
}

const SearchResults = ({
  isLoading,
  isError,
  data,
  setPage,
}: ISearchResults) => {
  const [hasMore, setHasMore] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());

  const { selectedMovie, setSelectedMovie } = MovieContext.useMovieContext();

  const { useFetchGenres } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const {
    data: gen,
    isLoading: genLoading,
    isError: genError,
  } = useFetchGenres();

  /**
   * Mapping response of genres endpoint to a map
   * for a quicker search operation.
   */
  useEffect(() => {
    if (genLoading || genError) return;
    let newMap: Map<number, string> = new Map();
    gen.genres.forEach(({ id, name }) => newMap.set(id, name));
    setGenreMap(newMap);
  }, [gen, genLoading, genError]);

  useEffect(() => {
    if (isLoading || isError) return;
    setHasMore(data.page < data.total_pages);

    const newMovies: Movie[] = mapResponseToMovies(data, genreMap);

    setMovies((prev) => [...(data.page > 1 ? prev : []), ...newMovies]);
  }, [isLoading, isError, data, genreMap]);

  /**
   * Disables background scroll (document) when a modal is open.
   * Should be replaced with a better approach
   */
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";
  }, [selectedMovie]);

  const cardItems = useMemo(() => {
    const ids = new Set();
    if (!movies) return [];

    return movies.map((movie: any) => {
      /**
       * Issue with Movie DB sometimes responsing on different pages
       * with the same movie, thus causing issues on Virtual DOM as
       * some elements ends up having the same key.
       */
      if (ids.has(movie.id)) return undefined;
      ids.add(movie.id);

      return <CardDetailed key={movie.id} {...movie} />;
    });
  }, [movies]);

  const onIntersectHandler = () => {
    if (hasMore && !(isLoading || isError)) {
      setPage(data.page + 1);
    }
  };

  return (
    <>
      <Container
        aria-disabled={true}
        onIntersect={onIntersectHandler}
        isLoading={isLoading}
        layout={Styles.Grid}
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
    </>
  );
};

export default SearchResults;
