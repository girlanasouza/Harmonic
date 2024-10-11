import json
import random
import uuid
import psycopg2
from dotenv import load_dotenv
import os
import time

class Recommendation:

    def __init__(self, host, port, database, user, password):
        self.conn = psycopg2.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password
        )

        with open('index.json', 'r') as file:
            self.index = json.load(file)

        self.initial_musics = [
            '04S1pkp1VaIqjg8zZqknR5', '0KztjtD3ytzgYjUKIVfBnW', '0cqRj7pUJDkTCEsJkx8snD',
            '0VwNdo84DaVYLIkbVO86ND', '6I9VzXrHxO9rA9A5euc8Ak', '0UaMYEvWZi0ZqiDOoHU3YI',
        ]

    def create_recommendation(self, playlist_base: list, qnt_songs=20) -> list:
        qnt_to_sample = max(int(qnt_songs * 0.2), 1)
        sampled_songs = random.sample(playlist_base, min(qnt_to_sample, len(playlist_base)))
        recommendation = set(sampled_songs) 

        qnt_to_rest = qnt_songs - len(recommendation)
        recommendation_to_music = max(qnt_to_rest // len(playlist_base), 1)

        for music in playlist_base:
            music_similarities = self.index.get(music, [])
            if music_similarities:
                recommended_songs = random.sample(music_similarities, min(recommendation_to_music, len(music_similarities)))
                recommendation.update(recommended_songs)

        return list(recommendation)

    def fetch_data_from_db(self, user_id: str):
        with self.conn.cursor() as curs:
            curs.execute("""
                SELECT users.id, playlist_songs."playlistId", playlist_songs."musicId"
                FROM public.users 
                JOIN playlists ON playlists."userId" = users.id
                JOIN playlist_songs ON playlist_songs."playlistId" = playlists.id
                WHERE playlists.is_recomendation = false AND users.id = %s;
            """, (user_id,))
            with_playlist = curs.fetchall()

            curs.execute("""
                UPDATE public.playlists 
                SET is_active = false 
                WHERE playlists.is_recomendation = true AND playlists."userId" = %s;
                
                DELETE FROM public.recomendations WHERE "userId" = %s;
            """, (user_id, user_id))

        self.conn.commit()
        return with_playlist

    def insert_data_to_db(self, new_playlist, user_play_recommendation):
        with self.conn.cursor() as curs:
            for playlist, songs_playlist in new_playlist:
                curs.execute("""
                    INSERT INTO public.playlists (id,title, describe,url_cover,"userId",is_recomendation,is_active)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """, (*playlist, True, True))

                play_id, songs_ids = songs_playlist
                play_ids_string = ",".join(user_play_recommendation[playlist[4]])

                for song_id in songs_ids:
                    curs.execute("""
                        INSERT INTO public.playlist_songs
                        VALUES (%s, %s)
                    """, (play_id, song_id))
                # fix table name to recommendations
                curs.execute("""
                    INSERT INTO public.recomendations ("userId", arrays_playlists)
                    VALUES (%s, %s) 
                    ON CONFLICT DO NOTHING
                """, (playlist[4], play_ids_string))

        self.conn.commit()

    def recommend_for_existing_users(self, user_id: str):
        with_playlist = self.fetch_data_from_db(user_id)
        users_playlists = {}
        user_play_recommendation = {}

        for user_id, playlist_id, song in with_playlist:
            if playlist_id not in users_playlists:
                users_playlists[playlist_id] = {"userId": user_id, "songs": []}
                user_play_recommendation[user_id] = []

            users_playlists[playlist_id]["songs"].append(song)

        new_playlist = []
        count = 1

        for playlist_id, item in users_playlists.items():
            songs = item['songs']
            for _ in range(2):
                play_recommendation = self.create_recommendation(songs)
                play_id = str(uuid.uuid4())
                new_playlist.append(
                    ((play_id, f'Recommendation {count}', "Recommendations", "", item['userId']),
                    (play_id, play_recommendation))
                )
                user_play_recommendation[item['userId']].append(play_id)
                count += 1

        self.insert_data_to_db(new_playlist, user_play_recommendation)

    def recommend_for_new_users(self, user_id: str):
        user_play_recommendation = {}
        new_playlist = []
        count = 1

        for _ in range(4):
            play_id = str(uuid.uuid4())
            play_recommendation = self.create_recommendation(self.initial_musics)
            new_playlist.append(
                ((play_id, f'Recommendation {count}', "Recommendations", "", user_id),
                 (play_id, play_recommendation))
            )

            if user_id not in user_play_recommendation:
                user_play_recommendation[user_id] = []

            user_play_recommendation[user_id].append(play_id)
            count += 1

        self.insert_data_to_db(new_playlist, user_play_recommendation)

    def close(self):
        self.conn.close()
