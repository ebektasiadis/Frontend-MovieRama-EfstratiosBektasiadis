import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useMovieDB from "../hooks/useMovieDB";
import Card from "./Card";

const Grid = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  overflow-y: auto;

  @media screen and (max-width: 1440px) {
    padding: 10px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface ICardContainerProps {
  cards: any[];
}

function CardContainer({ cards }: ICardContainerProps) {
  const [movies, setMovies] = useState<any[]>([]);

  const { useFetchNowPlaying } = useMovieDB(
    process.env.REACT_APP_MOVIEDB_API_KEY || ""
  );

  const { isLoading, data, hasMore, page, fetchNext } = useFetchNowPlaying();
  const observer: any = useRef();

  useEffect(() => {
    if (isLoading) return;
    setMovies((prev) => [...prev, ...(data || [])]);
  }, [isLoading, data, setMovies]);

  const lastCardListItem = useCallback(
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

  const getMovieTitles = () => {
    return movies.map((movie: any, index: number) => (
      <Card
        ref={movies.length === index + 1 ? lastCardListItem : undefined}
        key={`${movie.id}-${page}`}
        id={movie.id}
        poster={movie.poster_path}
        title={movie.title || movie.original_title}
        releaseYear={movie.release_date}
        genres={movie.genre_ids}
        rating={movie.vote_average}
        ratingCount={movie.vote_count}
        overview={movie.overview}
      />
    ));
  };

  return <Grid>{getMovieTitles()}</Grid>;
}

export default CardContainer;
