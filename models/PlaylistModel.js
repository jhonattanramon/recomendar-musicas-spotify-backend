const mongoose = require('mongoose')

const {Schema} = mongoose;

const PlaylistSchema = new Schema({
  name: {
  type: String,
  required: true
  },
  public: {
    type: Boolean,
  },
  collaborative: {
    type: Boolean
  },
  description:{
    type: String
  },
  image:{
    type: String
  }
  
 
},
{
  timestamps: true
})


const PlaylistModel = mongoose.model("Playlists", PlaylistSchema)



module.exports = { PlaylistModel }