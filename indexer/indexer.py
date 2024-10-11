from collections import defaultdict
from typing import List, Dict, Tuple, Any
import random

class Indexer:
    def __init__(self, playlist_song: List[Tuple[Any, str]], genre_song: List[Tuple[Any, str]]) -> None:
        """
        Initializes the Indexer with playlist and genre data.
        """
        cooccurrence_dict = self._create_song_cooccurrence_dict(playlist_song)
        tmp_dict = self._calculate_top_related_songs(cooccurrence_dict)
        self.index = self._complete_missing_songs(tmp_dict, genre_song)

    def _calculate_top_related_songs(self, song_counts: Dict[str, Dict[str, int]], top_n: int = 20) -> Dict[str, List[str]]:
        """
        Given a dictionary of song counts, returns an index of the top `top_n` related songs for each song.
        """
        related_songs_index = {}

        for song, related_songs in song_counts.items():
            # Sort related songs by their count in descending order and select the top `top_n`
            sorted_related_songs = sorted(related_songs.items(), key=lambda item: item[1], reverse=True)
            related_songs_index[song] = [related_song for related_song, _ in sorted_related_songs[:top_n]]

        return related_songs_index

    def _create_song_cooccurrence_dict(self, tuples_data: List[Tuple[Any, str]]) -> Dict[str, Dict[str, int]]:
        """
        Processes tuples of (id, song_list) to build a co-occurrence dictionary of songs.
        """
        cooccurrence_dict = defaultdict(lambda: defaultdict(int))

        for _, song_list in tuples_data:
            songs = song_list.split(",")
            num_songs = len(songs)

            for i in range(num_songs):
                for j in range(i + 1, num_songs):
                    song, related_song = songs[i], songs[j]
                    cooccurrence_dict[song][related_song] += 1
                    cooccurrence_dict[related_song][song] += 1 

        return cooccurrence_dict

    def _complete_missing_songs(self, index: Dict[str, List[str]], genre_data: List[Tuple[Any, str]], top_n: int = 20) -> Dict[str, List[str]]:
        """
        Complements the index with songs that are missing by sampling related songs from their genre.
        """
        for _, songs_list in genre_data:
            songs = songs_list.split(",")

            for song in songs:
                if song not in index:
                    sampled_songs = random.sample([s for s in songs if s != song], min(top_n, len(songs) - 1))
                    index[song] = sampled_songs

        return index

    def get_index(self) -> Dict[str, List[str]]:
        """
        Returns the final index of related songs.
        """
        return self.index
