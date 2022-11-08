import styled from "styled-components";

export const StyledReview = styled.article`
  border-radius: 5px;
  background: white;
`;

export const Header = styled.div`
  display: grid;
  background: var(--light-blue);
  border-radius: 5px 5px 0 0;
  grid-template-columns: auto 100%;
  grid-template-areas:
    "avatar author"
    "avatar created-at";
  padding: 20px 10px;
`;

export const Body = styled.div`
  padding: 20px 10px;
`;

export const Avatar = styled.img`
  border-radius: 5px;
  grid-area: avatar;
  margin-right: 10px;
  width: 64px;
`;

export const Author = styled.p`
  grid-area: "author";
  align-self: center;
`;

export const CreatedAt = styled.p`
  grid-area: "created-at";
`;
