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
  images:{
    type: [],
    default: [ { url: "https://i.pinimg.com/564x/08/54/fd/0854fde5bae64e078a68d37b9afec716.jpg" }]
  }
  
 
},
{
  timestamps: true
})


const PlaylistModel = mongoose.model("Playlists", PlaylistSchema)



module.exports = { PlaylistModel }