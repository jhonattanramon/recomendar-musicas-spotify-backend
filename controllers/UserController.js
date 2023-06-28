const { RegisterUser: RegisterModel } = require("../models/RegisterUser");

const UserController = {
  createUser: async (req, res) => {
    try {
      const { name, surname, email, password } = req.body;

      const dataUser = {
        name: name,
        surname: surname,
        email: email,
        password: password,
      };
      const response = await RegisterModel.create(dataUser);
      console.log(response);
      res.status(201).json({
        menssage: "user criado com sucesso!",
        stateRegiste: true
      });
    } catch (err) {
      if( err.code == 11000){
        res.json({
          menssage: "Email já cadastrado",
          stateMenssage: true,
        })
      }
      console.log(err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await RegisterModel.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
  getUser: async (req, res) => {
    try {
      //id => URL === GET
      const id = req.params.id;
      const user = await RegisterModel.findById(id);
      console.log(user);

      if (!user) {
        res.status(404).json({ msg: "serviço não encontrado" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await RegisterModel.findById(id);

      if (!user) {
        res.status(404).json({ msg: "serviço não encontrado" });
        return;
}

      const deleteUser = await RegisterModel.findByIdAndDelete(id);
      res.status(200).json({ deleteUser, msg: "deletado com sucesso" });
    } catch (err) {
      console.log("catches error");
      console.log(err);
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;

    const user = {
      name: req.body.name,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const updateUser = await RegisterModel.findByIdAndUpdate(id, user);

    if (!user) {
      res.status(404).json({ msg: "user não encontrado" });
      return;
    }

    res.status(200).json({ user, msg: "user atualizado com sucesso" });
  },

  login: async (req, res) => {
    try {
      console.log("login");
      const userDeBusca = await RegisterModel.find({
        email: req.body.email,
      });
      if (userDeBusca.length !== 0) {
        if (
          userDeBusca[0].password != req.body.password &&
          userDeBusca[0].email == req.body.email
        ) {
          res.json({
            menssage: "senha incorreta",
            stateErrorPassword: true,
            stateMenssage: true,
          });
        } else if (
          userDeBusca[0].password == req.body.password &&
          userDeBusca[0].email == req.body.email
        ) {
          res.json({ access: true });
        } else {
          res.json({ menssage: "algo deu errado" });
        }
      } else {
        res.json({
          menssage: "usuario não encontrado",
          stateErrorEmail: true,
          stateErrorPassword: true,
          stateMenssage: true,
        });
      }
    } catch (err) {
      res.status(500).json({ menssage: "usuario não encontrado", err });
    }
  },
};

module.exports = UserController;
