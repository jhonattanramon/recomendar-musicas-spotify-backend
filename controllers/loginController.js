const { Console, log } = require("console");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const { Requests } = require("../api/requisicoes");

let tokenUser;

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

  tokenApp: async (req, res) => {
    try {
      //const { email, password } = req?.body?.data;

      let token = jwt.sign(
        {
          foo: "bar",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            email: "jhonattanramon@gmail.com",
            password: "123ABC",
          },
        },
        process.env.JWTSECRET
      );
      tokenUser = token;
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(500).send("token não gerado");
    }
  },

  validadeToken: async (req, res) => {
    try {
      console.log(req.headers);
      const { token } = req.headers;

      // const teste = jwt.verify();

      if (token === tokenUser) {
        res.status(200).send("token validado");
      } else {
        res.status(401).send("token invalidado");
      }

      // if (!token) {
      //   res.status(401).send("token invalidado");
      // } else {
      //   res.status(200).send("token validado");
      // }
    } catch (err) {
      res.status(500).json({ msg: "token sem validação" });
    }
  },
};

module.exports = LoginController;
