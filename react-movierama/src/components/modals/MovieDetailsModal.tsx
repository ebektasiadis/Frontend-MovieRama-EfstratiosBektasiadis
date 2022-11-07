import { useEffect, useState } from "react";
import styled from "styled-components";
import useMovieDB from "../../hooks/useMovieDB";
import Card from "../Card";
import Modal from "../Modal";
import { Review } from "../Review";

const Grid = styled.div`
  display: grid;
  aspect-ratio: 16/9;
  max-width: 80vw;
  max-height: 80vh;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 65% 35%;
  grid-template-areas:
    "trailer reviews"
    "similar similar";
  gap: 10px;

  @media screen and (max-width: 1440px) {
    aspect-ratio: unset;
    max-height: 90vh;
    overflow: hidden;
    grid-template-rows: 40% 20% 40%;
    grid-template-columns: 100%;
    grid-template-areas:
      "trailer"
      "similar"
      "reviews";
  }
`;

const TrailerFrame = styled.iframe`
  display: block;
  border: none;
  border-radius: 5px;
  grid-area: trailer;
  height: 100%;
  width: 100%;
`;

const Reviews = styled.ul`
  border-radius: 5px;
  overflow: auto;
  overflow-x: hidden;
  grid-area: reviews;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Similar = styled.div`
  grid-area: similar;
  display: flex;
  column-gap: 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface IMovieDetailsModalProps {
  movieId: number;
  onHide: Function;
}

const isTrailer = (site: string, type: string) =>
  site === "YouTube" && type === "Trailer";

const MovieDetailsModal = ({ movieId, onHide }: IMovieDetailsModalProps) => {
  const [trailer, setTrailer] = useState("");

  const {
    useFetchMovieReviews,
    useFetchMovieSimilar,
    useFetchMovieVideos,
    useFetchMovieDetails,
  } = useMovieDB(process.env.REACT_APP_MOVIEDB_API_KEY || "");

  const { data: details } = useFetchMovieDetails(movieId);
  const { data: videos } = useFetchMovieVideos(movieId);
  const { data: reviews } = useFetchMovieReviews(movieId);
  const { data: similar } = useFetchMovieSimilar(movieId);

  useEffect(() => {
    if (videos) {
      setTrailer(
        videos.results.find(({ site, type }: any) => isTrailer(site, type))?.key
      );
    }
  }, [videos]);

  return (
    <Modal header={details ? details.title : ""} onHide={onHide}>
      <Grid>
        {trailer ? (
          <TrailerFrame
            src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=1`}
          />
        ) : null}
        {reviews ? (
          <Reviews>
            {reviews.results.map((review: any) => (
              <Review
                key={review.id}
                avatar={review.author_details.avatar_path}
                author={review.author}
                createdAt={review.created_at}
                content={review.content}
              />
            ))}
          </Reviews>
        ) : null}
        {similar ? (
          <Similar>
            {similar.results.map(
              ({ title, id, poster_path }: any, index: number) => (
                <Card key={id} id={id} title={title} poster={poster_path} />
              )
            )}
          </Similar>
        ) : null}
      </Grid>
    </Modal>
  );
};

export default MovieDetailsModal;
