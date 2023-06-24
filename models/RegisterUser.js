const mongoose = require('mongoose')

const {Schema} = mongoose;

const RegisterUserSchema = new Schema(
  {

  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
 

},
{
  timestamps: true
})


const RegisterUser = mongoose.model("users", RegisterUserSchema)



module.exports = {RegisterUser}