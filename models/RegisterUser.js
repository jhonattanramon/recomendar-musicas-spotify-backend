const mongoose = require('mongoose')

const {Schema} = mongoose;

const RegisterUserSchema = new Schema(
  {
  country: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  explicit_content: {
    type: Object,
    required: true
  },
  external_urls:{
      type: Object,
      required: true
  },
  followers:{
    type: Object, 
    required: true
  },
  href:{
    type: String,
    required: true
  },
  id:{
    type: String,
    required: true,
    unique:true
  },
  images:{
    type: Array || Object,
    required: true
  },
  product:{
    type: String,
    required: true,
    
  },
  type:{
    type: String,
    required: true
  },
  uri:{
    type: String,
    required: true
  }
 

},
{
  timestamps: true
})


const RegisterUser = mongoose.model("Users", RegisterUserSchema)



module.exports = {RegisterUser}