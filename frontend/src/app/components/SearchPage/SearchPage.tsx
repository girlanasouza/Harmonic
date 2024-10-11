"use client";

// playlistlisting

import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchMusicDirectory from "../SearchMusicDirectory/SearchMusicDirectory";
import NavigationBar from "../NavigationBar/NavigationBar";
import { BodyWrapper } from "./styles";
import { useMusicSearch } from "@/app/hooks/useMusicSearch";
import { CellItem } from "./styles";

const SearchPage = () => {
  const [query, setQuery] = useState<string>("");

  const { songs } = useMusicSearch(query);

  return (
    <div
      className="container-fluid d-flex flex-grow-1"
      style={{ overflow: "hidden" }}
    >
      <div className="col">
        <h4 className="fw-normal text-info-emphasis">Página de Busca</h4>
        <p className="fw-light">Busque por Artistas, Músicas e Playlists :)</p>

        <div className="justify-content-center">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        <hr></hr>

        <SearchMusicDirectory songs={songs} />
      </div>
    </div>
  );
};

export default SearchPage;
