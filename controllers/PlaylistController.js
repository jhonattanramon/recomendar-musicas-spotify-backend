const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const { PlaylistModel } = require("../models/playlistModel")

const { Requests } = require("../api/requisicoes");

const PlaylistController = {
  createPlaylist: async (req, res) => {
    try {
      const { name, public, description, collaborative } = req.body;
        const dataPlaylist = {
            name: name,
            description: description,
            public: public,
            collaborative: collaborative
        }
      const playlistCriada = await PlaylistModel.create(dataPlaylist)
      console.log(playlistCriada);
      res.status(200).json(playlistCriada)
        console.log(name, description, public, collaborative);

    } catch (err) {
      console.log("erro criar playlist app");
    }
  },

  getAllPlaylists: async ( req, res ) => {
    
  }
 
};

module.exports = PlaylistController 
