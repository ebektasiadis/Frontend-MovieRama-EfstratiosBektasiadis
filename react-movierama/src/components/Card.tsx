import { forwardRef, useContext } from "react";
import { CardStyles as Styles } from "@styles";
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
      <Styles.StyledCard
        ref={ref}
        aria-label={title}
        data-testid="card"
        onClick={() => setSelectedMovie(id)}
      >
        <Styles.Poster
          data-testid="poster-img"
          loading="lazy"
          alt={title}
          src={
            poster
              ? `https://image.tmdb.org/t/p/w200/${poster}`
              : `/movie-poster-placeholder.png`
          }
        />
      </Styles.StyledCard>
    );
  }
);

export default Card;
