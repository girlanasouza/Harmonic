"use client";
import { createContext, useState } from "react";

export type Song = {
  name: string;
  src: string;
  title: string;
  artist: string;
  img_url: string;
};

interface MusicPlayer {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
}

interface MusicPlayerContext {
  musicPlayer: MusicPlayer;
  setMusicPlayer: React.Dispatch<React.SetStateAction<MusicPlayer>>;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContext>({
  musicPlayer: {
    songs: [],
    currentIndex: 0,
    isPlaying: false,
  },
  setMusicPlayer: () => {},
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
});

interface MusicPlayerProps {
  children: React.ReactNode;
}

const MusicPlayerProvider = ({ children }: MusicPlayerProps) => {
  const [musicPlayer, setMusicPlayer] = useState<MusicPlayer>({
    songs: [],
    currentIndex: 0,
    isPlaying: false,
  });

  const play = () => {
    setMusicPlayer((prev) => ({ ...prev, isPlaying: true }));
  };

  const pause = () => {
    setMusicPlayer((prev) => ({ ...prev, isPlaying: false }));
  };

  const next = () => {
    setMusicPlayer((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.songs.length,
    }));
  };

  const previous = () => {
    setMusicPlayer((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.songs.length) % prev.songs.length,
    }));
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        musicPlayer,
        setMusicPlayer,
        play,
        pause,
        next,
        previous,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
