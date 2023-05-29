const { Console, log } = require("console");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");

const { Requests } = require("../api/AcessToken");

const LoginController = {
  login: async (req, res) => {
    try {
      const userDeBusca = await RegisterModel.find({
        email: req.body.email,
      });

      if (userDeBusca.length !== 0) {
        if (
          userDeBusca[0].password != req.body.password &&
          userDeBusca[0].email == req.body.email
        ) {
          res.statusCode(401);
        } else if (
          userDeBusca[0].password == req.body.password &&
          userDeBusca[0].email != req.body.email
        ) {
          res.statusCode(401);
        } else if (
          userDeBusca[0].password == req.body.password &&
          userDeBusca[0].email == req.body.email
        ) {
          const access =
            userDeBusca[0].password == req.body.password &&
            userDeBusca[0].email == req.body.email
              ? true
              : false;

          const requisicoes = new Requests();

          const validacao = await requisicoes.checkToken();

          console.log("validação", validacao);

          console.log(access);

          res.json({ access: access });
        } else {
          res.status(400).json({ access: "algo deu errado" });
        }
      } else {
        res.status(404).json({ menssage: "usuario não encontrado" });
        console.log("nenhum usuario encontrado");
      }
      //console.log(req.body);
    } catch (err) {
      res.status(500).json({ msg: "não encontrado", err });
    }
  },
};

module.exports = LoginController;
