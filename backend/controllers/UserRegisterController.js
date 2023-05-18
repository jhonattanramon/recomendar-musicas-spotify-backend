const { Console, log } = require("console");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");

const UserController = {
  create: async (req, res) => {

    console.log('create');
  
    try {
      const user = {
        name: req.body.name,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      };

      const response = await RegisterModel.create(user);

      res
        .status(201)
        .json({ response, msg: "response, msg: 'user criado com sucesso!" });
    } catch (err) {
      console.log(err);
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await RegisterModel.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
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
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await RegisterModel.findById(id);

      if (!user) {
        res.status(404).json({ msg: "serviço não encontrado" });
        return;
      }

      const deleteUser = await RegisterModel.findByIdAndDelete(id);
      res.status(200).json({ deleteUser,  msg: "deletado com sucesso" });
    } catch (err) {
      console.log('catches error');
      console.log(err);
    }
  },
  update: async (req, res) => { 
    
    const id = req.params.id
    
    const user = {
      name: req.body.name,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const updateUser = await RegisterModel.findByIdAndUpdate(id, user)

    if (!user) {
      res.status(404).json({ msg: "user não encontrado" });
      return;
    }

    res.status(200).json({ user, msg: "user atualizado com sucesso"})
  }
};

module.exports = UserController;
