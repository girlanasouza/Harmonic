
CREATE EXTENSION IF NOT EXISTS pg_trgm;


CREATE OR REPLACE FUNCTION update_searchable()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete all rows from Searchable
    DELETE FROM Searchable;

    -- Insert new data into Searchable
    INSERT INTO Searchable (
        song_id,
        song_title,
        song_duration,
        song_explicit,
        song_type,
        album_id,
        album_name,
        album_img_url,
        artist_id,
        artist_name,
        artist_img_url,
        search_field
    )
    SELECT
        son.id AS song_id,
        son.title AS song_title,
        son.duration AS song_duration,
        son.explicit AS song_explicit,
        son.song_type AS song_type,
        alb.id AS album_id,
        alb.name AS album_name,
        alb.image_url AS album_img_url,
        art.id AS artist_id,
        art.name AS artist_name,
        art.image_url AS artist_img_url,
        LOWER(CONCAT(son.title, ' ', alb.name, ' ', art.name)) AS search_field
    FROM public."MusicAlbum" AS mb
    LEFT JOIN public.songs AS son ON son.id = mb."musicId"
    LEFT JOIN public.albums AS alb ON alb.id = mb."albumId"
    LEFT JOIN public."ArtistAlbum" AS art_alb ON art_alb."albumId" = alb.id
    LEFT JOIN public.artists AS art ON art.id = art_alb."artistId";

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER artist_album_trigger
AFTER INSERT OR UPDATE OR DELETE ON public."ArtistAlbum"
FOR EACH STATEMENT
EXECUTE FUNCTION update_searchable();


-- Trigger new users

CREATE OR REPLACE FUNCTION notify_new_row() RETURNS trigger AS $$
BEGIN
	PERFORM pg_notify('new_user_created', NEW.id::text);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_row_trigger
AFTER INSERT ON public.users
FOR EACH ROW EXECUTE FUNCTION notify_new_row();



CREATE OR REPLACE FUNCTION notify_new_playlist_song() 
RETURNS trigger AS $$
DECLARE
    user_id UUID;
BEGIN
    -- Obter o userId da tabela playlists correspondente ao playlistId da nova linha inserida
    SELECT "userId" INTO user_id 
    FROM public.playlists 
    WHERE id = NEW."playlistId";

    -- Enviar uma notificação via pg_notify com o userId
    PERFORM pg_notify('new_song_added', user_id::text);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER new_playlist_song_trigger
AFTER INSERT ON public.playlist_songs
FOR EACH ROW EXECUTE FUNCTION notify_new_playlist_song();



CREATE OR REPLACE FUNCTION get_top_artists(id_to_search TEXT)
RETURNS TABLE(
    id_top TEXT,
    name_top TEXT,
    image_url_top TEXT,
    artist_count_top INTEGER,
    row_num_top BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH artist_counts AS (
        SELECT
            art.id,
            art."name"::TEXT AS "name",
            art.image_url::TEXT AS image_url,
            COUNT(play_song."playlistId")::INTEGER AS artist_count
        FROM public."MusicAlbum" AS mb
        LEFT JOIN public.songs AS son ON son.id = mb."musicId"
        LEFT JOIN public.albums AS alb ON alb.id = mb."albumId"
        LEFT JOIN public."ArtistAlbum" AS art_alb ON art_alb."albumId" = alb.id
        LEFT JOIN public.artists AS art ON art.id = art_alb."artistId"
        LEFT JOIN public.playlist_songs AS play_song ON play_song."musicId" = son.id
        RIGHT JOIN public.playlists ON playlists.id = play_song."playlistId"
        WHERE 
            play_song."playlistId" NOT IN (SELECT id FROM public.playlists WHERE playlists.is_recomendation = false)
            AND public.playlists."userId" = id_to_search
        GROUP BY art.id, art."name", art.image_url
        ORDER BY artist_count DESC
    ),
    counted_artists AS (
        SELECT *, ROW_NUMBER() OVER () AS row_num FROM artist_counts
    ),
    artist_random_fill AS (
        SELECT
            art.id,
            art."name"::TEXT AS "name",
            art.image_url::TEXT AS image_url,
            0 AS artist_count,
            NULL::INTEGER AS row_num
        FROM public.artists AS art
        WHERE art.id NOT IN (SELECT id FROM counted_artists)
        ORDER BY RANDOM()
        LIMIT 10
    )
    SELECT id AS id_top, "name" AS name_top, image_url AS image_url_top, artist_count AS artist_count_top, row_num AS row_num_top 
    FROM counted_artists
    UNION ALL
    SELECT id AS id_top, "name" AS name_top, image_url AS image_url_top, artist_count AS artist_count_top, row_num AS row_num_top  
    FROM artist_random_fill
    WHERE (SELECT COUNT(*) FROM counted_artists) < 10
    ORDER BY artist_count_top DESC, row_num_top
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;
