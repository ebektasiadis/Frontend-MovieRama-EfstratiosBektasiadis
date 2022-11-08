import { Movie } from "@src/types";
import { MovieListResponse } from "@src/types/responses";
import { useEffect, useMemo, useState } from "react";
import { CardDetailed, Container } from "@components";
import { Grid } from "@styles/Layouts.styled";

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

  useEffect(() => {
    if (isLoading || isError) return;
    setHasMore(data.page < data.total_pages);

    const newMovies: Movie[] = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: movie.release_date,
      genres: [],
      rating: movie.vote_average,
      ratingCount: movie.vote_count,
      overview: movie.overview,
      poster: movie.poster_path,
    }));

    setMovies((prev) => [...(data.page > 1 ? prev : []), ...newMovies]);
  }, [isLoading, isError, data]);

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
    console.log(
      `intersecting and setting page to ${
        data.page + 1
      }, ${hasMore}, ${isLoading}`
    );
    if (hasMore && !(isLoading || isError)) {
      setPage(data.page + 1);
    }
  };

  return (
    <Container
      aria-disabled={true}
      onIntersect={onIntersectHandler}
      isLoading={isLoading}
      layout={Grid}
    >
      {cardItems}
    </Container>
  );
};

export default SearchResults;
