-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "url_img_profile" VARCHAR(100) NOT NULL,
    "birth" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "url_music" VARCHAR(100) NOT NULL,
    "duration" DECIMAL(10,2) NOT NULL,
    "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "explicit" BOOLEAN NOT NULL,
    "song_type" VARCHAR(25) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "release_year" DATE NOT NULL,
    "image_url" VARCHAR(150) NOT NULL,
    "total_tracks" INTEGER NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicAlbum" (
    "musicId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "MusicAlbum_pkey" PRIMARY KEY ("musicId","albumId")
);

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR(150) NOT NULL,
    "artist_type" VARCHAR(100) NOT NULL,
    "main_genre" VARCHAR NOT NULL,
    "genres" VARCHAR NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistAlbum" (
    "albumId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistAlbum_pkey" PRIMARY KEY ("albumId","artistId")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "describe" VARCHAR(200),
    "url_cover" VARCHAR(100),
    "is_recomendation" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_songs" (
    "playlistId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,

    CONSTRAINT "playlist_songs_pkey" PRIMARY KEY ("playlistId","musicId")
);

-- CreateTable
CREATE TABLE "searchable" (
    "song_id" TEXT NOT NULL,
    "song_title" VARCHAR(300) NOT NULL,
    "song_duration" DECIMAL(10,2) NOT NULL,
    "song_explicit" BOOLEAN NOT NULL,
    "song_type" VARCHAR(25),
    "album_id" TEXT,
    "album_name" VARCHAR(300),
    "album_img_url" VARCHAR(150),
    "artist_id" TEXT,
    "artist_name" VARCHAR(100),
    "artist_img_url" VARCHAR(150),
    "search_field" VARCHAR(1000) NOT NULL,

    CONSTRAINT "searchable_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "recomendations" (
    "userId" TEXT NOT NULL,
    "arrays_playlists" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MusicAlbum_musicId_key" ON "MusicAlbum"("musicId");

-- CreateIndex
CREATE UNIQUE INDEX "recomendations_userId_key" ON "recomendations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistFollows_AB_unique" ON "_ArtistFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistFollows_B_index" ON "_ArtistFollows"("B");

-- AddForeignKey
ALTER TABLE "MusicAlbum" ADD CONSTRAINT "MusicAlbum_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicAlbum" ADD CONSTRAINT "MusicAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistAlbum" ADD CONSTRAINT "ArtistAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistAlbum" ADD CONSTRAINT "ArtistAlbum_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recomendations" ADD CONSTRAINT "recomendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistFollows" ADD CONSTRAINT "_ArtistFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistFollows" ADD CONSTRAINT "_ArtistFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
