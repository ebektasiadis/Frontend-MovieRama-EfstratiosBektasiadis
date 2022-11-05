import styled from "styled-components";

const StyledHeader = styled.header`
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
`;

const Logo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: auto;
  width: 50px;
`;

const LogoName = styled.h1`
  font-size: 2em;
  color: var(--light-blue);
`;

const Searchbar = styled.input`
  grid-area: searchbar;
  height: 50px;
  border-radius: 100px;
  padding: 0 25px;
  border: none;
  outline: none;
  outline-offset: 0;
`;

interface IHeaderProps {
  query: string;
  setQuery: (value: string) => void;
}

function Header({ query, setQuery }: IHeaderProps) {
  return (
    <StyledHeader>
      <Logo>
        <Image src="/logo192.png" alt="MovieRama" />
        <LogoName>MovieRama</LogoName>
      </Logo>
      <Searchbar
        type="text"
        placeholder="Search a movie..."
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      ></Searchbar>
    </StyledHeader>
  );
}

export default Header;
