"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PlaylistDetailsPage from "@/app/components/PlaylistDetailsPage/PlaylistDetailsPage";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PlaylistDetailsPage />
    </QueryClientProvider>
  );
};

export default Search;
