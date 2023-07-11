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

    async getInforToken(req, res){
        res.json(this.getInforToken)
    }
      
}

module.exports = UserController
