require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const server = express();

server.use(express.json());

//models

const User = require("./models/User");

//public router
server.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});

//private route

server.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuario não econtrado" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authotization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(404).json({ msg: "acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
  } catch (error) {
    res.status(400).json({ msg: "token ivalido" });

    next();
  }
}

//resgitrar usuario
server.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(442).json({ msg: "o nome é obrigatorio" });
  }
  if (!email) {
    return res.status(442).json({ msg: "o email é obrigatorio" });
  }
  if (!password) {
    return res.status(442).json({ msg: "o sanha é obrigatorio" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  //checar se o email existe

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({ msg: "por favor, utilize outro e-mail!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "usuario criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro com o servidor" });
  }
});

//login user

server.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: "Os campos é obrigatório" });
  }

  //check se o user existe

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "por favor, utilize outro e-mail" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) return res.status(422).json({ msg: "senha ivalida" });

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res
      .status(200)
      .json({ msg: "Autenticação realizada com sucesso! ", token });
  } catch (err) {
    res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    });
  }
});

const dbUser = process.env.DB_USER;
const bdPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${bdPassword}@cluster0.elsca2r.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("conectou ao banco"))
  .catch((error) => console.log(error));

server.listen(3000);
