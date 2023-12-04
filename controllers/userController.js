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

      async setLogout(req, res){
        try{
          const { stateLogout } = this.logout()
          console.log(stateLogout);
          res.json({stateLogout: stateLogout})
        }catch(e){
          res.json({stateLogout: false})
        }
      }
    
      async stateAuth(req, res){
        try{
          
        }catch(e){

        }
      }

      
}

module.exports = UserController
