import { forwardRef, useContext } from "react";
import { StyledCard, Poster } from "@styles/Card.styled";
import { MovieContext } from "@src/App";
interface ICardProps {
  id: number;
  title: string;
  poster?: string;
}

const Card = forwardRef<any, ICardProps>(
  ({ id, title, poster }: ICardProps, ref) => {
    const { setSelectedMovie } = useContext(MovieContext);
    return (
      <StyledCard
        ref={ref}
        aria-label={title}
        data-testid="card"
        onClick={() => setSelectedMovie(id)}
      >
        <Poster
          data-testid="poster-img"
          loading="lazy"
          alt={title}
          src={
            poster
              ? `https://image.tmdb.org/t/p/w200/${poster}`
              : `/movie-poster-placeholder.png`
          }
        />
      </StyledCard>
    );
  }
);

export default Card;
