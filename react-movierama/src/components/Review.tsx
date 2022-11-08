import { forwardRef } from "react";
import {
  StyledReview,
  Header,
  Avatar,
  Author,
  CreatedAt,
  Body,
} from "@styles/Review.styled";

interface IReviewProps {
  avatar: string;
  author: string;
  createdAt: string;
  content: string;
}

const Review = forwardRef<any, IReviewProps>(
  ({ avatar, author, createdAt, content }: IReviewProps, ref) => {
    return (
      <StyledReview ref={ref}>
        <Header>
          <Avatar
            loading="lazy"
            src={`https://secure.gravatar.com/avatar/${avatar}`}
          />
          <Author>{author}</Author>
          <CreatedAt>{createdAt}</CreatedAt>
        </Header>
        <Body>
          <p>{content}</p>
        </Body>
      </StyledReview>
    );
  }
);

export default Review;
