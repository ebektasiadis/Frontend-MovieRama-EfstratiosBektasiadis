import { useCallback, useRef } from "react";
import styled from "styled-components";
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
  infinite: boolean;
  onIntersect?: Function;
  hasMore?: boolean;
}

type OptionalCardContainerProps =
  | ({ infinite: false } & ICardContainerProps)
  | ({ infinite: true } & Required<ICardContainerProps>);

function CardContainer({
  cards,
  infinite = false,
  onIntersect,
  hasMore,
}: OptionalCardContainerProps) {
  const observer: any = useRef();

  const lastCardListItem = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();

      if (!infinite) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && onIntersect) {
          onIntersect();
        }
      });
      if (node) observer.current.observe(node);
    },
    [infinite, onIntersect, hasMore]
  );

  const mapStateToCards = () => {
    const ids = new Set();
    return cards.map((movie: any, index: number) => {
      /**
       * Issue with Movie DB sometimes responsing on different pages
       * with the same movie, thus causing issues on Virtual DOM as
       * some elements ends up having the same key.
       */
      if (ids.has(movie.id)) return undefined;
      ids.add(movie.id);

      return (
        <Card
          ref={cards.length === index + 1 ? lastCardListItem : undefined}
          key={movie.id}
          id={movie.id}
          poster={movie.poster_path}
          title={movie.title || movie.original_title}
          releaseYear={movie.release_date}
          genres={movie.genre_ids}
          rating={movie.vote_average}
          ratingCount={movie.vote_count}
          overview={movie.overview}
        />
      );
    });
  };

  return <Grid>{mapStateToCards()}</Grid>;
}

export default CardContainer;
