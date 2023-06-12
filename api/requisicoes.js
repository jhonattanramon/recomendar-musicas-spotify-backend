const axios = require("axios").default;

let tokens;
const tokenTst = {
  token: (token) => {
    tokens = token;
    console.log(tokens);
  },
};

const urlBaseSpotify = "https://api.spotify.com/v1";

const listaDeArtistas = [
  "5nP8x4uEFjAAmDzwOEc9b8",
  "68PYmgkbRP1qZnEWOry7sB",
  "5InVWl8IZB8zFAoNa5roKm",
];

class Requests {
  constructor(token) {
    this.token = token;
  }

  async user() {
    try {
      const result = await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);

      return result;
    } catch (err) {
      console.log("erros");
    }
  }

  async playlist() {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/playlists/37i9dQZF1DX0FOF1IUWK1W`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);

      // console.log("resilt", result);

      return result;
    } catch (err) {
      console.log("playlist error");
    }
  }
  async obterVariosArtistas() {
    try {
      const result = await axios
        .get(
          `https://api.spotify.com/v1/artists?ids=${listaDeArtistas[0]},${listaDeArtistas[1]}`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        )
        .then((res) => res.data);

      console.log(result);

      return result;
    } catch (err) {
      console.log("obterVariosArtistas");
    }
  }

  async obterGeneros() {
    try {
      const generosTraduzidos = [
        "acústico",
        "afrobeat",
        "alt-rock",
        "alternativo",
        "ambiente",
        "anime",
        "black-metal",
        "bluegrass",
        "blues",
        "bossanova",
        "brasil",
        "breakbeat ",
        "british",
        "cantopop",
        "chicago-house",
        "children",
        "chill",
        "classical",
        "club",
        "comedy",
        "country",
        "dance",
        "dancehall",
        "death -metal",
        "deep-house",
        "detroit-techno",
        "disco",
        "disney",
        "drum-and-bass",
        "dub",
        "dubstep",
        "edm",
        "electro",
        "eletrônico ",
        "emo",
        "folk",
        "forro",
        "french",
        "funk",
        "garage",
        "german",
        "gospel",
        "goth",
        "grindcore",
        "groove",
        "grunge",
        "guitar",
        "happy",
        "hard-rock",
        "hardcore",
        "hardstyle",
        "heavy-metal",
        "hip-hop",
        "holidays",
        "honky-tonk",
        "house",
        "idm ",
        "indian",
        "indie",
        "indie-pop",
        "industrial",
        "iranian",
        "j-dance",
        "j-idol",
        "j-pop",
        "j-rock",
        "jazz ",
        "k-pop",
        "kids",
        "latin",
        "latino",
        "malay",
        "mandopop",
        "metal",
        "metal-misc",
        "metalcore",
        "minimal-techno",
        "filmes ",
        "mpb",
        "new-age",
        "new-release",
        "ópera",
        "pagode",
        "party",
        "philippines-opm",
        "piano",
        "pop",
        "pop-film",
        "post-dubstep",
        "power-pop",
        "progressive-house",
        "psych-rock",
        "punk",
        "punk-rock",
        "r-n-b",
        "rainy-day",
        "reggae",
        "reggaeton ",
        "road-trip",
        "rock",
        "rock-n-roll",
        "rockabilly",
        "romance",
        "triste",
        "salsa",
        "samba",
        "sertanejo",
        "show-tunes",
        "cantor-compositor",
        "ska",
        "sono",
        "compositor",
        "alma",
        "trilhas sonoras",
        "espanhol",
        "estudo",
        "verão",
        "sueco",
        "synth-pop",
        "tango ",
        "techno",
        "trance",
        "trip-hop",
        "turco",
        "work-out",
        "world-music",
      ];

      const result = await axios
        .get(`${urlBaseSpotify}/recommendations/available-genre-seeds`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);
      console.log(result);

      return {
        result: result,
        generesTraduzido: generosTraduzidos,
      };
    } catch (err) {
      console.log("obterGeneros");
    }
  }

  async playlistsEmDestaque() {
    try {
      const result = await axios
        .get(
          `${urlBaseSpotify}/browse/featured-playlists?coutry=BR&timestamp=2023-01-01T09%3A00%3A00&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          }
        )
        .then((res) => res.data);
      return result;
    } catch (err) {
      console.log("err playsDestaques");
    }
  }

  async tracksPlaylist(url) {
    try {
      const result = await axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      console.log("tracks trackPlaylist");
    }
  }

  async tracksArtist(id) {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/artists/${id}/top-tracks?market=BR`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);

      return result;
    } catch (err) {
      console.log("track artists");
    }
  }

  async track(url) {
    try {
      const result = await axios
        .get(`${url}`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res);
      return result;
    } catch (err) {
      console.log("erro track");
      const msgError = { msg: "error no servidor" };
      return msgError;
    }
  }

  async checkToken() {
    try {
      if (tokens.access_token) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  async pesquisaGenere({ genre, type }) {
    try {
      if (genre != undefined && type != undefined) {
        console.log(genre, type);
        console.log(tokens.access_token);
        const { data } = await axios
          .get(
            `${urlBaseSpotify}/search?q=remaster=genre:${genre}&type=${type}&limit=50`,
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            }
          )
          .then((res) => res);

        console.log("result try: " + data);

        return data;
      } else {
        return;
      }
    } catch (err) {
      console.log("pesquisaGenere");
    }
  }

  async pesquisaTrack(nameTrack) {
    try {
      console.log(tokens.access_token);
      console.log(nameTrack);
      const result = await axios
        .get(`${urlBaseSpotify}/search?q=${nameTrack}&type=track`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);
      console.log(result);
      return result;
    } catch (err) {
      console.log("pesquisaTrack");
    }
  }

  async pesquisa({ nameTrack, nameArtist }) {
    try {
      let url = `${urlBaseSpotify}/search?q=remaster:genre=pagode&type=artist `;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });
      return data;
    } catch (err) {
      console.log("erro pessquisa!!");
    }
  }
}
module.exports = { Requests, tokenTst };
