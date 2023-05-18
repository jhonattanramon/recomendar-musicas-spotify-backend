const mongoose = require('mongoose')

const {Schema} = mongoose;

const LoginSchema = new Schema({


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


const LoginModel = mongoose.model("LoginConect", LoginSchema)



module.exports = {LoginModel}