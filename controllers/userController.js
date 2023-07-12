const User = require("../api/User");
const {RegisterUser} = require("../models/RegisterUser");

 class UserController extends User{
    
    async registerUser(req, res){
        try{
            const dataUser = req.body 
            const register = await RegisterUser.create(dataUser)
            res.send(register)
        }catch(e){ 
            if(e.code === 11000){
                res.send("error: usuario já existe cadastro")
            }
        }
    }

    async setDataUser(req, res) {
        try {
          this.setData({ data: req.headers.data });
          res.status(200).json({msg: "data setting"})
        } catch (err) {
          console.log("erro get id");
        }
      }
    

      
}

module.exports = UserController
