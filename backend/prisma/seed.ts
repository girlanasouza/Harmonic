import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

const seed = async () => {
    // read artists.json and insert
   const artistData = JSON.parse(await fs.readFile('./prisma/data/artists.json', 'utf-8'));
   const albumData = JSON.parse(await fs.readFile('./prisma/data/albums.json', 'utf-8'));
   const songsData = JSON.parse(await fs.readFile('./prisma/data/songs.json', 'utf-8'));
   const songsAlbum = JSON.parse(await fs.readFile('./prisma/data/songsAlbum.json', 'utf-8'));
   const albumArt = JSON.parse(await fs.readFile('./prisma/data/albumArtist.json', 'utf-8'));

   await prisma.artist.createMany({
    data: artistData,
    skipDuplicates: true
   })

   await prisma.album.createMany({
    data: albumData,
    skipDuplicates: true
   })

    await prisma.music.createMany({
        data: songsData,
        skipDuplicates: true
    });

    await prisma.musicAlbum.createMany({
        data: songsAlbum,
        skipDuplicates: true
    });

    await prisma.artistAlbum.createMany({
        data: albumArt,
        skipDuplicates: true
    });

    await prisma.user.createMany({
      data: [
        {
          id: "c9a76b9c-d71d-4be2-a742-08617e862ceb",
          name: "Natanael Bezerra de Oliveira",
          email: "natanael.oliveira@icomp.ufam.edu.br",
          password: "$2a$04$FkldHnYXeVzc/gySr84mde/wY0qmQ1.Gr53SHUSbNYQPsIIwK605u",
          birth: "2001-09-01T00:00:00.000Z",
          url_img_profile: "https://cdn.pixabay.com/photo/2020/04/27/09/21/cat-5098930_960_720.jpg"
        },
        {
          id: "aacd282e-d07c-4bb4-9ebb-289c3f4cef75",
          name: "User Teste 1",
          email: "user.teste1@icomp.ufam.edu.br",
          password: "$2a$04$qQdDBUHKIyX90cjzoP9ope6xinAgXK6DUzsgCF2jvs3WGcUa56/J6",
          birth: "1999-01-01T00:00:00.000Z",
          url_img_profile: "https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg"
        }
      ],
      skipDuplicates: true
    })

  await prisma.$executeRaw`CREATE INDEX search_field_gin_trgm_idx ON searchable USING GIN (search_field gin_trgm_ops);`;

}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });