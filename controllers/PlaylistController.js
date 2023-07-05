const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const { PlaylistModel } = require("../models/PlaylistModel")

const { Requests } = require("../api/Requisicoes");

const PlaylistController = {
  createPlaylist: async (req, res) => {
    try {
      const { name, public, description, collaborative, image } = req.body;
        const dataPlaylist = {
            name: name,
            description: description,
            public: public,
            collaborative: collaborative,
            image: image
        }
      const playlistCriada = await PlaylistModel.create(dataPlaylist)
      res.status(200).json({
        response: playlistCriada,
        state: true
      })
    } catch (err) {
      console.log("erro criar playlist app");
    }
  },

  getAllPlaylists: async ( req, res ) => {
    try{
      const playlists = await PlaylistModel.find()
      res.status(200).json({
              items: playlists,
              state: true
            })
    }catch(err){
      res.status(500).json({
              response: err,
              state: false
            })
    }
      
  }
 
};

module.exports = PlaylistController 
