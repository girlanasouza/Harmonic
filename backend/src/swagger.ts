import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "Harmonic",
    description: "Documetation",
  },
  definitions: {
    Music: {
      id: "07M76e7IXxYdnC1BBiJxEX",
      title: "All The Man That I Need",
      duration: 211160,
      url_music: "00.mp3",
      year: "2024-07-16T17:49:11.768Z",
      explicit: false,
      song_type: "Solo",
      album: {
        id: "5LaUUDnUTySWnJLj1xiBnw",
        name: "I'm Your Baby Tonight",
        img_url:
          "https://i.scdn.co/image/0221a0a50f3b59dda67fcbfd050614c246dd78bd",
      },
      artist: {
        id: "6XpaIBNiVzIetEPCWDvAFP",
        name: "Whitney Houston",
        img_url:
          "https://i.scdn.co/image/9cd1d09d5a351ca65c2f45246703614748ea9fed",
      },
    },
    Musics: [
      {
        id: "07M76e7IXxYdnC1BBiJxEX",
        title: "All The Man That I Need",
        duration: 211160,
        url_music: "00.mp3",
        year: "2024-07-16T17:49:11.768Z",
        explicit: false,
        song_type: "Solo",
        album: {
          id: "5LaUUDnUTySWnJLj1xiBnw",
          name: "I'm Your Baby Tonight",
          img_url:
            "https://i.scdn.co/image/0221a0a50f3b59dda67fcbfd050614c246dd78bd",
        },
        artist: {
          id: "6XpaIBNiVzIetEPCWDvAFP",
          name: "Whitney Houston",
          img_url:
            "https://i.scdn.co/image/9cd1d09d5a351ca65c2f45246703614748ea9fed",
        },
      },
    ],
    MusicsSearch: [
      {
        id: "07M76e7IXxYdnC1BBiJxEX",
        title: "All The Man That I Need",
        duration: 211160,
        explicit: false,
        song_type: "Solo",
        album: {
          id: "5LaUUDnUTySWnJLj1xiBnw",
          name: "I'm Your Baby Tonight",
          img_url:
            "https://i.scdn.co/image/0221a0a50f3b59dda67fcbfd050614c246dd78bd",
        },
        artist: {
          id: "6XpaIBNiVzIetEPCWDvAFP",
          name: "Whitney Houston",
          img_url:
            "https://i.scdn.co/image/9cd1d09d5a351ca65c2f45246703614748ea9fed",
        },
      },
    ],

    SearchMusicRequest: {
      query: "Bruno Mars",
    },
    UserCreateDto: {
      name: "User Teste 1",
      email: "user.teste1@icomp.ufam.edu.br",
      birth: "1999-01-01",
      url_img_profile: "",
      password: "Harmonic123",
    },
    UserUpdateDto: {
      name: "User Teste 1",
      birth: "2001-09-01",
      url_img_profile: "",
    },
    User: {
      id: "aacd282e-d07c-4bb4-9ebb-289c3f4cef75",
      name: "User Teste 1",
      email: "user.teste1@icomp.ufam.edu.br",
      birth: "1999-01-01T00:00:00.000Z",
      url_img_profile: "",
      createdAt: "2024-08-04T22:50:30.207Z",
      updatedAt: "2024-08-04T22:50:30.207Z",
    },
    Login: {
      email: "user.teste1@icomp.ufam.edu.br",
      password: "Harmonic123",
    },
    IPlaylistDTO: {
      title: "Litters musics",
      describe: "heheheh",
    },
    Playlist: {
      id: "c7923dc6-a324-4c2a-974e-7ca2e069d21b",
      title: "Litters musics",
      describe: "heheheh",
      url_cover: null,
    },
    PlaylistArray: [
      {
        id: "ecd091e7-7410-42bd-b4c8-bf8b2eec4811",
        title: "Com noventa",
        describe: "Vou ligar",
        length: 1,
        total_time: 196413,
      },
      {
        id: "1799358c-c8ec-4e8b-a441-0312c98c0132",
        title: "Tenho pouco a dizer",
        describe: "dsadsda",
        url_cover: "",
        length: 0,
        total_time: 0,
      },
    ],
    SongPlay: {
      playlistId: "c89aef32-afc6-4888-8b7d-d87d064f7a39",
      musicId: "b2d20562-620f-4ab5-8a08-61f305987b52",
      music: {
        id: "b2d20562-620f-4ab5-8a08-61f305987b52",
        title: "Stole the Show",
        url_music: "00.mp3",
        duration: "223186",
        year: "2024-07-16T17:49:11.768Z",
      },
    },
    Artist: {
      id: "54d5s4d5a4ds5646sa",
      name: "dsadsdasds",
      image_url: ""
    },
    Artists: [
      {
        id: "54d5s4d5a4ds5646sa",
        name: "dsadsdasds",
        image_url: ""
      },
      {
        id: "54d5s4d5a4ds5646sa",
        name: "dsadsdasds",
        image_url: ""
      }
    ]
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
};

const outputFile = "./doc/swagger-output.json";
const routes = ["./src/router/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
