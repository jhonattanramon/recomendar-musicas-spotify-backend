require("dotenv/config");
const User = require("../api/User");
const axios = require("axios").default;
const urlBaseSpotify = "https://api.spotify.com/v1";

class spotifyController extends User {
  //autenticação
  async auth(req, res, next) {
    try {
      if (req.headers.authorization !== "undefined") {
        classReq.token(req.headers.authorization);
        res.status(200).json({ msg: "ok" });
      } else {
        console.log("não autorizado");
        res.status(401).json({ msg: "não autorizado" });
      }
    } catch (err) {
      console.log("errr");
    }
  }

  async token(req, res) {
    try {
      this.setToken({
        access_token: req.headers.access_token,
        refresh_token: req.headers.refresh_token,
      });
    } catch (err) {
      console.log("error token");
    }
  }

  async data(req, res) {
    try {
      this.setDataUser({ data: req.headers.data });
    } catch (err) {
      console.log("erro get id");
    }
  }

  async inforsUser(req, res) {
    try {
      const {data: inforsUser} = await axios
        .get(`${urlBaseSpotify}/me`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res);
      res.status(200).json(inforsUser);
    } catch (err) {
      console.log("err");
    }
  }

  //playlist

  async createPlaylist(req, res) {
    try {
      const { name, publicList, collaborative, description } = req.body 
      const {data: playlist} = await axios.post(`${urlBaseSpotify}/users/${this.dataUser.id}/playlists`,
          {
            name: name,
            public: publicList,
            description: description,
            collaborative: collaborative,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              "Content-Type": "application/json"
            },
          }
        )
        .then((res) => res)
        .catch((err) => err);
      res.status(200).json({...playlist, create:true});
    } catch (err) {
       res.status(500).json(err);
    }
  }

  async playlistsEmDestaque(req, res) {
    try {
      const destaquesPlaylists = await axios
        .get(
          `${urlBaseSpotify}/browse/featured-playlists?coutry=BR&timestamp=2023-01-01T09%3A00%3A00&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => res.data);
      res.status(200).json(destaquesPlaylists);
    } catch (err) {
      res.status(500).json(err);
      console.log("criarPlaylist");
    }
  }
  async playlist(req, res) {
    try {
      const playlist = await axios
        .get(`${urlBaseSpotify}/playlists/${req.headers.playlist_ID}`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res.data);
      res.status(200).json(playlist);
    } catch (err) {
      console.log("playlist err");
    }
  }

  async adionarMusicasPlaylist(req, res) {
    try {
      const { id, item } = req.body.data;
      const res = await axios
        .post(
          `${urlBaseSpotify}/playlists/${id}/tracks`,
          {
            uris: [item.uri],
            position: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          return {
            res: res,
            resItem: item,
          };
        });

      res.status(201).json(res.resItem);
    } catch (err) {
      console.log("adicionarMusicasPlaylist");
    }
  }
  //generos

  async obterGeneros(req, res) {
    try {
      const generos = await axios
        .get(`${urlBaseSpotify}/recommendations/available-genre-seeds`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res.data);
      res.status(200).json(generos);
    } catch (err) {
      console.log("obterGeneros");
    }
  }

  //tracks

  async tracksPlaylist(req, res) {
    try {
      const tracks = await axios
        .get(`${req.headers.url}`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res.data);
      res.status(200).json(tracks);
    } catch (err) {
      console.log("tracks err");
    }
  }
  async track(req, res) {
    try {
      const { data } = await axios
        .get(`${req.headers.hreftrack}`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res);
      res.status(200).json(data);
    } catch (err) {
      console.log("err track");
    }
  }
  //pesquisa

  async pesquisa(req, res) {
    try {
      const { data } = await axios.get(
        `${urlBaseSpotify}/search?q=remaster:genre=pagode&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );
      res.status(200).json(data);
    } catch (err) {
      console.log("err pesquisa");
    }
  }

  async pesquisaTrack(req, res) {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/search?q=${req.headers.nameTrack}&type=track`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res.data);
      res.status(200).json(result);
    } catch (err) {
      console.log("err pesquisa track");
    }
  }

  async pesquisaGenere(req, res) {
    try {
      const { data } = await axios
        .get(
          `${urlBaseSpotify}/search?q=remaster=genre:${req.body.genre}&type=${req.body.type}&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => res);
      res.status(200).json(data);
    } catch (err) {
      console.log("err");
    }
  }

  async playlistUser(req, res) {
    try {
      const { data } = await axios
        .get(`${urlBaseSpotify}/me/playlists?limit=50`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((res) => res);

      res.status(200).json(data);
    } catch (err) {
      console.log("playlist user");
    }
  }
}

module.exports = spotifyController;
