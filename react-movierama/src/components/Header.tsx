import { ChangeEvent, memo, useRef } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { HeaderStyles as Styles } from "@styles";

interface IHeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  isLoading: boolean;
}

const Header = memo(
  ({ searchInput, setSearchInput, isLoading }: IHeaderProps) => {
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
        <Styles.StyledHeader>
          <Styles.Logo onClick={() => window.location.reload()}>
            <Styles.Image
              spinning={isLoading}
              src="/logo192.png"
              alt="MovieRama"
              aria-label="MovieRama"
            />
            <Styles.LogoName>MovieRama</Styles.LogoName>
          </Styles.Logo>
          <Styles.SearchBar>
            <Styles.SearchInput
              type="text"
              placeholder="Search a movie..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchInput(event?.target.value)
              }
              value={searchInput}
              ref={searchFieldRef}
            ></Styles.SearchInput>
            <Styles.KbdCombination
              aria-label={"Press CTRL and Capital F to search"}
            >
              <Styles.Kbd>CTRL</Styles.Kbd>+<Styles.Kbd>F</Styles.Kbd>
            </Styles.KbdCombination>
          </Styles.SearchBar>
        </Styles.StyledHeader>
      </GlobalHotKeys>
    );
  }
);

export default Header;
