import { useRef } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import {
  StyledHeader,
  Logo,
  Image,
  LogoName,
  SearchBar,
  SearchInput,
  KbdCombination,
  Kbd,
} from "@styles/Header.styled";

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
          <Image src="/logo192.png" alt="MovieRama" aria-label="MovieRama" />
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
          <KbdCombination aria-label={"Press CTRL and Capital F to search"}>
            <Kbd>CTRL</Kbd>+<Kbd>F</Kbd>
          </KbdCombination>
        </SearchBar>
      </StyledHeader>
    </GlobalHotKeys>
  );
}

export default Header;
