import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import {
  SearchBarWrapper,
  SearchPopup,
  SearchPopupList,
  SearchPopupItem,
  SearchInput,
} from "./styles";

const addSearchTerm = (term: string) => {
  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  ) as string[];

  const updatedSearches = [
    term,
    ...recentSearches.filter((t) => t !== term),
  ].slice(0, 20);

  localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
};

type SearchBarProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredSearches, setFilteredSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchPopupVisible, setIsSearchPopupVisible] =
    useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    ) as string[];
    setRecentSearches(searches);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const filtered = recentSearches
        .filter((term) => term.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setFilteredSearches(filtered);
      setLoading(false);
      setIsSearchPopupVisible(filtered.length > 0);
    } else {
      setFilteredSearches(recentSearches.slice(0, 5));
      setIsSearchPopupVisible(true);
    }
  }, [query, recentSearches]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query) {
      addSearchTerm(query);
      setQuery("");
      setIsSearchPopupVisible(false);
    }
  };

  const handleSearchFocus = () => {
    if (filteredSearches.length > 0 || query === "") {
      setIsSearchPopupVisible(true);
    }
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    setIsSearchPopupVisible(false);
  };

  return (
    <SearchBarWrapper ref={searchRef} style={{ borderRadius: "100px" }}>
      <form onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          placeholder="Músicas, Playlist, Artistas, Albuns..."
          className="rounded"
        />
      </form>
      {isSearchPopupVisible && (
        <SearchPopup>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <SearchPopupList>
              {filteredSearches.map((term, index) => (
                <SearchPopupItem
                  key={index}
                  onClick={() => handleSuggestionClick(term)}
                >
                  {term}
                </SearchPopupItem>
              ))}
            </SearchPopupList>
          )}
        </SearchPopup>
      )}
    </SearchBarWrapper>
  );
};

export default SearchBar;
