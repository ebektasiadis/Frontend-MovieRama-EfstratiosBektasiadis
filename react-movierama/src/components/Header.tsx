import { useRef } from "react";
import { GlobalHotKeys } from "react-hotkeys";
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

  @media screen and (max-width: 1200px) {
    padding: 0 10px;
  }

  @media screen and (max-width: 992px) {
    grid-template-areas: "searchbar searchbar logo";
  }
`;

const Logo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;

  @media screen and (max-width: 992px) {
    justify-content: right;
  }
`;

const Image = styled.img`
  height: auto;
  width: 50px;
`;

const LogoName = styled.h1`
  font-size: 2em;
  color: var(--light-blue);

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 100px;
  padding: 0 25px;
  border: none;
  outline: none;
  outline-offset: 0;
`;

const SearchBar = styled.div`
  grid-area: searchbar;
  display: flex;
  position: relative;
  align-items: center;
`;

const KbdCombination = styled.div`
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

const Kbd = styled.kbd`
  padding: 5px 10px;
  background-color: #e4e4e4;
  border: 1px solid gray;
  border-radius: 5px;
`;

interface IHeaderProps {
  query: string;
  setQuery: (value: string) => void;
}

function Header({ query, setQuery }: IHeaderProps) {
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const keyMap = {
    FOCUS_SEARCH_FIELD: "ctrl+F",
  };

  const handlers = {
    FOCUS_SEARCH_FIELD: (e: any) => {
      e.preventDefault();
      if (searchFieldRef?.current) searchFieldRef.current.focus();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <StyledHeader>
        <Logo onClick={() => window.location.reload()}>
          <Image src="/logo192.png" alt="MovieRama" />
          <LogoName>MovieRama</LogoName>
        </Logo>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search a movie..."
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            ref={searchFieldRef}
          ></SearchInput>
          <KbdCombination>
            <Kbd>CTRL</Kbd>+<Kbd>F</Kbd>
          </KbdCombination>
        </SearchBar>
      </StyledHeader>
    </GlobalHotKeys>
  );
}

export default Header;
