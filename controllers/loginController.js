const { Console, log } = require("console");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");

const LoginController = {

  login: async ( req, res ) => {

    try{

      console.log('aqui');
      const users = await RegisterModel.find()
     
      console.log(req.body);
      const userDeBusca = await RegisterModel.find({email: req.body.email, password: req.body.password})
      console.log(userDeBusca.length);

      if( userDeBusca.length !== 0 ){
        console.log("usario encontrado");

      const access = userDeBusca[0].password == req.body.password && userDeBusca[0].email == req.body.email ? true : false

          console.log(access);

          res.json({ access : access})

      }else{
      res.status(404).json({ status:404})
        console.log("nenhum usuario encontrado");
      }
      //console.log(req.body);

    }catch( err){
        res.status(500).json({msg: "não encontrado", err})
    }
  }

}

module.exports = LoginController;