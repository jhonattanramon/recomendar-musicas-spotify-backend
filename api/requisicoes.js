const axios = require("axios").default;

const urlBaseSpotify = "https://api.spotify.com/v1";

class User{
  constructor(access_token_spf, refresh_token_spf, token_app){
      this.access_token_spf = access_token_spf,
      this.refresh_token_spf = refresh_token_spf
      this.token_app = token_app
  }   

  setToken_spf({access_token, refresh_token }){
    console.log(access_token, refresh_token);
      this.access_token_spf = access_token
      this.refresh_token_spf = refresh_token
  }
  setToken_app(token){
      this.token_app = token
  }

  logout(){
    this.access_token_spf = null,
    this.refresh_token_spf = null,
    this.token_app = null
  }
}



class Requests extends User {
  async user() {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/me`, {
          headers: {
            Authorization: `Bearer ${this.access_token_spf}`,
          },
        })
        .then((res) => res);

      return result;
    } catch (err) {
      console.log("erros user", err);
    }
  }

  async playlist(playlist_ID) {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/playlists/${playlist_ID}`, {
          headers: {
            Authorization: `Bearer ${this.access_token_spf}`,
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
              Authorization: `Bearer ${this.access_token_spf}`,
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
            Authorization: `Bearer ${this.access_token_spf}`,
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
              Authorization: `Bearer ${this.access_token_spf}`,
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
            Authorization: `Bearer ${this.access_token_spf}`,
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
            Authorization: `Bearer ${this.access_token_spf}`,
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
            Authorization: `Bearer ${this.access_token_spf}`,
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
      if (this.access_token_spf) {
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
                Authorization: `Bearer ${this.access_token_spf}`,
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
            Authorization: `Bearer ${this.access_token_spf}`,
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
          Authorization: `Bearer ${this.access_token_spf}`,
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
          `https://api.spotify.com/v1/users/${this.token_app}/playlists`,
          {
            name: dataUser.name,
            public: dataUser.public,
            collaborative: dataUser.collaborative,
            description: dataUser.description,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token_spf}`,
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
      const res = await axios
        .post(
          `${urlBaseSpotify}/playlists/${id}/tracks`,
          {
            uris: [item.uri],
            position: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token_spf}`,
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

  async playlistUser() {
    try {
      console.log(this.token_app);
      const res = await axios
        .get(`${urlBaseSpotify}/users/${this.token_app}/playlists?limit=50`, {
          headers: {
            Authorization: `Bearer ${this.access_token_spf}`,
          },
        })
        .then((res) => res);
      return res;
    } catch (err) {
      console.log("error playlist user");
    }
  }
}

const testeToken = (token) => {
  console.log(token);
  const UserTeste = new Requests()
  UserTeste.setToken_spf(token)
  UserTeste.playlistsEmDestaque()
  
}


module.exports = { Requests,User, testeToken };
