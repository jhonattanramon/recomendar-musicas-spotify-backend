const { Console, log } = require("console");
const { json } = require("express");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const axios = require("axios").default;
var $ = require("jquery");
require("dotenv/config");
const { Requests, tokenTst } = require("../api/AcessToken");
const { ok } = require("assert");
const { channel } = require("diagnostics_channel");
const express = require("express");

const classReq = new Requests();

const spotifyController = {
  auth: async (req, res, next) => {
    try {
      if (req.headers.authorization !== "undefined") {
        tokenTst.token(req.headers.authorization);
        res.status(200).json({ msg: "ok" });
      } else {
        console.log("não autorizado");
        res.status(401).json({ msg: "não autorizado" });
      }
    } catch (err) {
      console.log("errr");
    }
  },

  token: async (req, res) => {
    try {
      const { access_token, refresh_token } = req.headers;
      tokenTst.token({
        access_token: access_token,
        refresh_token: refresh_token,
      });

      res.status(200).json({ msg: "token chegou" });
    } catch (err) {
      console.log("error token");
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
      const destaquesPlaylists = await classReq.playlistsEmDestaque();
      res.status(200).json(destaquesPlaylists);
    } catch (err) {
      res.status(500).json(err);
      console.log();
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
    try {
      const classReq = new Requests();
      const generos = await classReq.obterGeneros();
    } catch (err) {
      console.log("obterGeneros");
    }
  },
  tracksPlaylist: async (req, res) => {
    try {
      const tracks = await classReq.tracksPlaylist(req.headers.hreftracks);
      res.status(200).json(tracks);
    } catch (err) {
      console.log("tracks err");
    }
  },
  authConfirmado: async (req, res) => {
    try {
    } catch (err) {
      res.status(403).json(err);
    }
  },
  track: async (req, res) => {
    try {
      const { data } = await classReq.track(req.headers.hreftrack);
      console.log("track:", data);
      res.status(200).json(data);
    } catch (err) {
      console.log("err track");
    }
  },
};

module.exports = spotifyController;
