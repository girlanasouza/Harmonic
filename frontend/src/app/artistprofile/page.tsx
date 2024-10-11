"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockArtists } from "../mocks/artists";
import ArtistPage from "../components/ArtistPage/ArtistPage";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ArtistPage artist={mockArtists[0]} />
    </QueryClientProvider>
  );
};

export default UserProfile;
