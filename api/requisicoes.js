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
      const result = await axios
        .get(`${urlBaseSpotify}/recommendations/available-genre-seeds`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);
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

  async pesquisa({ nameTrack, nameArtist }) {
    try {
      let url;
      if (nameTrack != undefined && nameArtist == undefined) {
        url = `${urlBaseSpotify}/search?q=remaster:track:${nameTrack}&type=track&limit=50`;
      } else if (nameTrack == undefined && nameArtist != undefined) {
        url = `${urlBaseSpotify}/search?q=remaster:artist:${nameArtist}&type=artist&limit=50`;
      } else if (nameArtist != undefined && nameTrack != undefined) {
        url = `${urlBaseSpotify}/search?q=remaster:track:${nameTrack}:artist:${nameArtist}&type=track:artist&limit=50`;
      } else {
        url = `${urlBaseSpotify}/search?q=remaster:genre=pagode&type=artist `;
      }

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
