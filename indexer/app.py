import os
import psycopg2
from dotenv import load_dotenv
import json
from indexer import Indexer


# Load environment variables
load_dotenv()

# Database configuration
DATABASE_CONFIG = {
    'host': os.getenv("DATABASE_HOST"),
    'port': os.getenv("DATABASE_PORT"),
    'database': os.getenv("DATABASE"),
    'user': os.getenv("DATABASE_USER"),
    'password': os.getenv("DATABASE_PASSWORD")
}

conn = psycopg2.connect(**DATABASE_CONFIG)

with conn.cursor() as curs:
    curs.execute("""
SELECT 
    "playlistId", 
    STRING_AGG("musicId"::text, ',') AS musicIds
FROM 
    public.playlist_songs
WHERE 
    "playlistId" NOT IN (SELECT id FROM playlists WHERE playlists.is_recomendation = false)
GROUP BY 
    "playlistId";
""")
    records1 = curs.fetchall()

    curs.execute("""
SELECT
	art.main_genre,
	STRING_AGG(son.id::text, ',') as musicIds
FROM public."MusicAlbum" AS mb
LEFT JOIN public.songs AS son ON son.id = mb."musicId"
LEFT JOIN public.albums AS alb ON alb.id = mb."albumId"
LEFT JOIN public."ArtistAlbum" AS art_alb ON art_alb."albumId" = alb.id
LEFT JOIN public.artists AS art ON art.id = art_alb."artistId"
GROUP BY art.main_genre;
""")
    records2 = curs.fetchall()


index = Indexer(records1, records2).get_index()

with open('../recomendation/index.json', 'w') as file:
    json.dump(index, file, indent=4)

print("Index created")