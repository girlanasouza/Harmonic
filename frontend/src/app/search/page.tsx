"use client";

import { useState } from "react";
import SearchPage from "../components/SearchPage/SearchPage";
import { QueryClient, QueryClientProvider } from "react-query";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
};

export default Search;
