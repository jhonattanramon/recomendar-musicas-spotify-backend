require("dotenv/config");
const User = require("../api/User");
const axios = require("axios").default;
const querystring = require("querystring");
const request = require("request");
const client_id = process.env.CLIENT_ID_SPOTIFY; // Your client id
const client_secret = process.env.CLIENT_SECRECT_SPOTIFY; // Your secret
const redirect_uri = process.env.REDIRECT_DEV; // Your redirect uri

const URlServer = "https://appnative-backend.onrender.com";
const URLDev = "http://192.168.0.25:3004"
const urlSpotify = "https://api.spotify.com/v1";


var stateKey = "spotify_auth_state";


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
      const bodytoken= JSON.parse(req.headers.bodytoken)
      this.setToken(bodytoken);
      res.send("tokens setting")
    } catch (err) {
      console.log("error token");
    }
  }

  // async setDataUser(req, res) {
  //   try {
  //     this.setData({ data: req.headers.data });
  //     res.status(200).json({msg: "data setting"})
  //   } catch (err) {
  //     console.log("erro get id");
  //   }
  // }



  async inforsUser(req, res) {
    try {
    console.log(this.dataUser);
      const {data: inforsUser} = await axios
        .get(`${urlSpotify}/me`, {
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
      const {data: playlist} = await axios.post(`${urlSpotify}/users/${this.dataUser.id}/playlists`,
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
      console.log(this.access_token);
      const destaquesPlaylists = await axios
        .get(
          `${urlSpotify}/browse/featured-playlists?coutry=BR&timestamp=2023-01-01T09%3A00%3A00&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => res.data);
        console.log(destaquesPlaylists);
      res.status(200).json(destaquesPlaylists);
    } catch (err) {
      res.status(200).json(err);
      console.log("criarPlaylist");
    }
  }
  async playlist(req, res) {
    try {
      const playlist = await axios
        .get(`${urlSpotify}/playlists/${req.headers.playlist_ID}`, {
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
          `${urlSpotify}/playlists/${id}/tracks`,
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
        .get(`${urlSpotify}/recommendations/available-genre-seeds`, {
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
      const { data: namePlaylsit } = req.headers
      console.log(namePlaylsit);
      const { data } = await axios.get(
        `${urlSpotify}/search?q=${namePlaylsit}&type=playlist&offset=500`,
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      res.status(301).json({msg: "erro na pesquisa"})
    }
  }

  async pesquisaTrack(req, res) {
    try {
      const result = await axios
        .get(`${urlSpotify}/search?q=${req.headers.nameTrack}&type=track`, {
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
          `${urlSpotify}/search?q=remaster=genre:${req.body.genre}&type=${req.body.type}&limit=50`,
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
        .get(`${urlSpotify}/me/playlists?limit=50`, {
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

  async login(req, res){
    console.log("login");
    let generateRandomString = function (length) {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
    const state = generateRandomString(16);
    // your application requests authorization
    const scope =
      "user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private ugc-image-upload";
// Envie uma mensagem com um valor
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );

  }


  async callback(req, res) {
      const testeCode = req.headers.code 
      const code = req.query.code || null;
      const state = req.query.state || null;
      const storedState = req.cookies ? req.cookies[stateKey] : null;
      
    function redirection(){
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: testeCode,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;
  
          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            (async () => {
              await axios.get(`${URLDev}/api/setdatauser`, {
                headers: {
                  data: JSON.stringify(body),
                },
              }).then( res => res).catch( (err) => err )

              await axios.post(`${URLDev}/api/registeruser`, {
                ...body
              }).then( res => res)
  
              
            })();
          });
  
          (async  () =>  {
           await axios
              .get(`${URLDev}/api/token`, {
                headers: {
                   bodyToken: JSON.stringify(body)
              },
              })
              .then((res) => res);
            
          })();
          res.status(200).json({ dataToken: { ...body, state: true}})
        } else {
          res.status(301).json({state: false, menssage:"algo deu errado ao realizar o login"})
        }
      });
    }

    
    if( testeCode !== undefined){
      redirection(testeCode)
    }else{
      res.send("")
    }
  }     

  
  async refreshToken(req, res){
    const refresh_token = req.body.refresh_token;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };
  
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        console.log(body);
        res.json({
          access_token: access_token,
        });
      }
    });
  }
  
    async getInforToken(req, res){
      console.log("getToken");
      res.status(200).json(this.infor)
  }
}
module.exports = spotifyController;
