const { Console, log } = require("console");
const { json } = require("express");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const axios = require("axios").default;
var $ = require("jquery");
require("dotenv/config");
const { Requests, tokenTst } = require("../api/AcessToken");
const { ok } = require("assert");


const classReq = new Requests()


const spotifyController = {
  auth: async (req, res, next) => {
    try {
      tokenTst.token(req.headers.authorization);
      res.status(200).json("ok");
    } catch (err) {
      console.log("errr");
    }
  },

  token: async (req, res) => {
    console.log("entrou token controler");

    try {
      await axios
        .get("http://localhost:8887", {
          headers: {
            Authorization: `Bearer BQBrUf18R0iOttmbIoMhYcO83O5DLqcj6NCpF2H0cBQRwP52hgHkEWVEiVXZZnjFTzQf3PfrHT4X2X7oYYoDKITl6PTtZvtjcc0lOqAYSYElWCfPDq1wdevl4YAhovpk7-sfZPgUiScx4Prfp1yR7J_YZs7B2Fksx9EqmqNpK47Jgwxp90zWzNv7WTVCJ55jdQc4W6molMBwC4rKhk0`,
            json: true,
          },
        })
        .then((dados) => console.log(dados.data));

      console.log("token response");
    } catch (err) {
      console.log(err);
    }
  },

  user: async (req, res) => {
    console.log(req.headers.authorization);

    try {
      console.log("res");

      await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: ``,
            json: true,
          },
        })
        .then((dados) => console.log(dados));
      console.log(response);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.status(200).send({ res: response });
    } catch (err) {
      console.log("err");
    }
  },

  playlistsEmDestaque: async (req, res) => {
    try {
         const destaquesPlaylists =  await classReq.playlistsEmDestaque();
          res.status(200).json(destaquesPlaylists)
    }catch(err){
      console.log('getAll');
    }
  },
  playlist: async (req, res) => {
    try {
      const classReq = new Requests();
      const playlist = await classReq.playlist();
      console.log(playlist);
      res.status(200).json(playlist);
    } catch (err) {
      console.log("playlist err");
    }
  },

  obterVariosArtistas: async (req, res) => {
    try {
      const classReq = new Requests();
      const artistas = await classReq.obterVariosArtistas();

      res.status(200).json(artistas);
    } catch (err) {
      console.log("obterVariosArtistas");
    }
  },

  obterGeneros: async (req, res) => {
    try{
      const classReq = new Requests();
      const generos =  await classReq.obterGeneros()
      
    }catch(err){
      console.log('obterGeneros');
    }
  },
  tracksPlaylist: async (req, res) => {
    try{
      console.log(req.headers.hreftracks);
     const tracks =  await classReq.tracksPlaylist(req.headers.hreftracks)
      res.status(200).json(tracks)
    }catch(err){
      console.log("tracks err");
    }
  }
};

module.exports = spotifyController;
