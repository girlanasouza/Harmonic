"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { mockArtists } from "../mocks/artists";
import UserProfilePage from "../components/UserProfilePage/UserProfilePage";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProfilePage artist={mockArtists[0]} />
    </QueryClientProvider>
  );
};

export default UserProfile;
