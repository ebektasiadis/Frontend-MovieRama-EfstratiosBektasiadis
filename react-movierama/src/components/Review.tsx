import { forwardRef } from "react";
import { ReviewStyles as Styles } from "@styles";

interface IReviewProps {
  avatar: string;
  author: string;
  createdAt: string;
  content: string;
}

const Review = forwardRef<any, IReviewProps>(
  ({ avatar, author, createdAt, content }: IReviewProps, ref) => {
    return (
      <Styles.StyledReview ref={ref}>
        <Styles.Header>
          <Styles.Avatar
            loading="lazy"
            src={`https://secure.gravatar.com/avatar/${avatar}`}
          />
          <Styles.Author>{`Written by ${author}`}</Styles.Author>
          <Styles.CreatedAt>{`At ${new Date(
            createdAt
          ).toLocaleString()}`}</Styles.CreatedAt>
        </Styles.Header>
        <Styles.Body>
          <p>{content}</p>
        </Styles.Body>
      </Styles.StyledReview>
    );
  }
);

export default Review;
