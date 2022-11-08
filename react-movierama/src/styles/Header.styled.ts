import styled from "styled-components";

interface IImageProps {
  spinning: boolean;
}

export const StyledHeader = styled.header`
  top: 0;
  position: sticky;
  z-index: 1;
  display: grid;
  grid-template-areas: "logo searchbar .";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100%;
  background-color: var(--primary-color);
  filter: drop-shadow(0px 0px 8px #000000);
  padding: 0 50px;
  height: 5em;
  align-items: center;

  @media screen and (max-width: 1200px) {
    padding: 0 10px;
  }

  @media screen and (max-width: 992px) {
    grid-template-areas: "searchbar searchbar logo";
  }
`;

export const Logo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;

  @media screen and (max-width: 992px) {
    justify-content: right;
  }
`;

export const Image = styled.img<IImageProps>`
  height: auto;
  width: 50px;

  animation: ${(props) => props.spinning && "1s spin infinite ease-in-out"};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
`;
export const LogoName = styled.h1`
  font-size: 2em;
  color: var(--light-blue);

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 100px;
  padding: 0 25px;
  border: none;
  outline: none;
  outline-offset: 0;
`;

export const SearchBar = styled.div`
  grid-area: searchbar;
  display: flex;
  position: relative;
  align-items: center;
`;

export const KbdCombination = styled.div`
  display: flex;
  gap: 1px;
  position: absolute;
  align-items: center;
  justify-items: center;
  right: 20px;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

export const Kbd = styled.kbd`
  padding: 5px 10px;
  background-color: #e4e4e4;
  border: 1px solid gray;
  border-radius: 5px;
`;
