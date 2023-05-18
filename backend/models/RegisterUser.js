const mongoose = require('mongoose')

const {Schema} = mongoose;

const RegisterUserSchema = new Schema(
  {

  name: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 

},
{
  timestamps: true
})


const RegisterUser = mongoose.model("RegisterUser", RegisterUserSchema)



module.exports = {RegisterUser}