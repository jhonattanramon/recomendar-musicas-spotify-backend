const axios = require("axios").default;

let tokens;
let userID;

const tokenTst = {
  token: (token) => {
    tokens = token;
  },
};

const getUserID = {
  id: (id) => {
    userID = id;
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

  async playlist(playlist_ID) {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/playlists/${playlist_ID}`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);

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

      return result;
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
        return tokens;
      }
    } catch (err) {
      return false;
    }
  }

  async pesquisaGenere({ genre, type }) {
    try {
      if (genre != undefined && type != undefined) {
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
      const result = await axios
        .get(`${urlBaseSpotify}/search?q=${nameTrack}&type=track`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
        .then((res) => res.data);
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

  async criarPlaylist(dataUser) {
    try {
      const result = await axios
        .post(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            name: dataUser.name,
            public: dataUser.public,
            collaborative: dataUser.collaborative,
            description: dataUser.description,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          return {
            response: response.data,
            state: true,
          };
        })
        .catch((error) => {
          return {
            response: error,
            state: false,
          };
        });
      return result;
    } catch (err) {
      console.log("criar playlist");
    }
  }

  async adicionarMusicasPlaylist(data) {
    try {
      const { id, item } = data;
      console.log(id, item.uri);
      console.log(tokens.access_token);
      const res = await axios
        .post(
          `${urlBaseSpotify}/playlists/${id}/tracks`,
          {
            uris: [item.uri],
            position: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          return {
            res: res,
            resItem: item,
          };
        })
        .catch((err) => err);

      return res;
    } catch (err) {
      console.log("add musicas");
    }
  }
}
module.exports = { Requests, tokenTst, getUserID };
