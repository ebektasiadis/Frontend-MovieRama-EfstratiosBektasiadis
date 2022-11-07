import styled from "styled-components";

const StyledReview = styled.article`
  border-radius: 5px;
  background: white;
`;

const Header = styled.div`
  display: grid;
  background: var(--light-blue);
  border-radius: 5px 5px 0 0;
  grid-template-columns: auto 100%;
  grid-template-areas:
    "avatar author"
    "avatar created-at";
  padding: 20px 10px;
`;

const Body = styled.div`
  padding: 20px 10px;
`;

const Avatar = styled.img`
  border-radius: 5px;
  grid-area: avatar;
  margin-right: 10px;
  width: 64px;
`;

const Author = styled.p`
  grid-area: "author";
`;

const CreatedAt = styled.p`
  grid-area: "created-at";
`;

interface IReviewProps {
  avatar: string;
  author: string;
  createdAt: string;
  content: string;
}

export const Review = ({
  avatar,
  author,
  createdAt,
  content,
}: IReviewProps) => {
  return (
    <StyledReview>
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
};
