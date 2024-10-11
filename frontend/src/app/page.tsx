"use client";

import InitialPage from "./components/InitialPage/InitialPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import PlaylistProvider from "./state/playlistProvider";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <PlaylistProvider>
        <InitialPage />
      </PlaylistProvider>
    </QueryClientProvider>
  );
}
