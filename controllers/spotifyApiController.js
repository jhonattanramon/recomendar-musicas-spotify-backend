require("dotenv/config");
const User = require("../api/User");
const axios = require("axios").default;
const urlBaseSpotify = "https://api.spotify.com/v1";
const querystring = require("querystring");
const request = require("request");

const client_id = process.env.CLIENT_ID_SPOTIFY; // Your client id
const client_secret = process.env.CLIENT_SECRECT_SPOTIFY; // Your secret
const redirect_uri = process.env.REDIRECT_URI_NEW_PRODUCT; // Your redirect uri

const baseURlServer = "https://appnative-backend.onrender.com";
const baseURLDev = "http://localhost:3004";
const basURLDevAuth = "http://localhost:8887";
const baseURLserverAuth = "https://appnative-backend-auth.onrender.com";


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
    res.cookie(stateKey, state);
  
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
    const testeCode = req.headers.code || null

      const code = req.query.code || null;
      const state = req.query.state || null;
      const storedState = req.cookies ? req.cookies[stateKey] : null;
      

    function redirection(testeCode){
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code || testeCode,
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
            console.log("body", body);
            (async () => {
              await axios.get(`${baseURlServer}/api/setdatauser`, {
                headers: {
                  data: JSON.stringify(body),
                },
              }),
                then((res) => res);
  
              
            })();
          });
  
          (async function () {
           await axios
              .get(`${baseURlServer}/api/token`, {
                headers: {
                   access_token: access_token,
                   refresh_token: refresh_token,
              },
              })
              .then((res) => res.data);
          })();
          res.status(200).json({ state: true})
        } else {
          res.status(200).json({ state: false})
          // res.redirect(
          //   "/#" +
          //     querystring.stringify({
          //       error: "invalid_token",
          //     })
          // );
        }
      });
    }

    if( testeCode !== null){
      redirection(testeCode)
      return
    }

   if (state === null || state !== storedState ) {
     res.status(200).json({ msg: "invalid state" })
  } else {
      redirection()
  //   res.clearCookie(stateKey);
  //   var authOptions = {
  //     url: "https://accounts.spotify.com/api/token",
  //     form: {
  //       code: code,
  //       redirect_uri: redirect_uri,
  //       grant_type: "authorization_code",
  //     },
  //     headers: {
  //       Authorization:
  //         "Basic " +
  //         Buffer.from(client_id + ":" + client_secret).toString("base64"),
  //     },
  //     json: true,
  //   };



  //   request.post(authOptions, function (error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       var access_token = body.access_token,
  //         refresh_token = body.refresh_token;

  //       var options = {
  //         url: "https://api.spotify.com/v1/me",
  //         headers: { Authorization: "Bearer " + access_token },
  //         json: true,
  //       };

  //       // use the access token to access the Spotify Web API
  //       request.get(options, function (error, response, body) {
  //         console.log("body", body);
  //         (async () => {
  //           await axios.get(`${baseURlServer}/api/setdatauser`, {
  //             headers: {
  //               data: JSON.stringify(body),
  //             },
  //           }),
  //             then((res) => res);

            
  //         })();
  //       });

  //       (async function () {
  //        await axios
  //           .get(`${baseURlServer}/api/token`, {
  //             headers: {
  //                access_token: access_token,
  //                refresh_token: refresh_token,
  //           },
  //           })
  //           .then((res) => res.data);
  //       })();
  //     //  window.ReactNativeWebView.postMessage(JSON.stringify({value: true}))
  //       res.status(200).json({ state: true})
  //       //res.redirect(`${baseURLserverAuth}/confirmAuth.html`);
  //     } else {
  //       res.redirect(
  //         "/#" +
  //           querystring.stringify({
  //             error: "invalid_token",
  //           })
  //       );
  //     }
  //   });
   }
      
}
}
module.exports = spotifyController;
