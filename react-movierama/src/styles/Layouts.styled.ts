import styled from "styled-components";

export const Grid = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  overflow-x: hidden;

  @media screen and (max-width: 1200px) {
    padding: 25px 10px;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    padding: 25px 5px;
  }
`;
