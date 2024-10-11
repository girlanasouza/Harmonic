"use client";

import { useState } from "react";
import PlaylistListingPage from "../components/PlaylistListingPage/PlaylistListingPage";
import { QueryClient, QueryClientProvider } from "react-query";
import RequiredLogin from "../components/RequiredLogin/RequiredLogin";
import PlaylistProvider from "../state/playlistProvider";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PlaylistProvider>
        <PlaylistListingPage />
        <RequiredLogin />
      </PlaylistProvider>
    </QueryClientProvider>
  );
};

export default Search;
