const axios = require("axios").default;

let tokenG;

const tokenTst = {
  token: (token) =>{tokenG = token},
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

  async playlist() {
    try {
      const result = await axios
        .get(`${urlBaseSpotify}/playlists/37i9dQZF1DX0FOF1IUWK1W`, {
          headers: {
            Authorization: `Bearer ${tokenG}`,
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
              Authorization: `Bearer ${tokenG}`,
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
            Authorization: `Bearer ${tokenG}`,
          },
        })
        .then((res) => res.data);
    } catch (err) {
      console.log("obterGeneros");
    }
  }

  async playlistsEmDestaque() {
    try {
      console.log(tokenG);
      const result = await axios
        .get(`${urlBaseSpotify}/browse/featured-playlists?coutry=BR&timestamp=2023-01-01T09%3A00%3A00&limit=20`, 
        {
          headers:{
            Authorization: `Bearer ${tokenG}`,
          }
        })
        .then((res) => res.data);
          return result
    } catch (err) {
      console.log("err playsDestaques");
    }
  }

  async tracksPlaylist(url){
    try{
      console.log(tokenG);
        const result = await axios.get(`${url}`, {
          headers:{
            Authorization: `Bearer ${tokenG}`,
          }
        }).then( res => res.data)

        console.log("result", result);
        
        return result
    }catch(err){
      console.log("tracks trackPlaylist");
    }
  }


  async track(url){
    try{
      console.log("token",tokenG);
      const result = await axios.get(`${url}`,{
        headers:{
          Authorization: `Bearer ${tokenG}`
        }
      }).then( res => res)

      console.log("result track", result);
      return result
    }
    catch(err){
      console.log("erro track");
    }
  }
}
module.exports = { Requests, tokenTst };
