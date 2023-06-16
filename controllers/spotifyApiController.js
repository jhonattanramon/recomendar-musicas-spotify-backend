const { Console, log } = require("console");
const { json } = require("express");
const { RegisterUser: RegisterModel } = require("../models/RegisterUser");
const axios = require("axios").default;
var $ = require("jquery");
require("dotenv/config");
const { Requests, tokenTst } = require("../api/requisicoes");
const { ok } = require("assert");
const { channel } = require("diagnostics_channel");
const express = require("express");


const classReq = new Requests();

const spotifyController = {
  //autenticação
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
    try {
      const inforUserSpotify = await classReq.user();
      res.status(200).json(inforUserSpotify);
    } catch (err) {
      console.log("err");
    }
  },

  //playlist

  criarPlaylist: async (req, res) => {
    try {
      const playlistCriada = await classReq.criarPlaylist();
      res.status(200).json(playlistCriada);
    } catch (err) {
      res.status(500).json(err);
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

  //usuario

  obterVariosArtistas: async (req, res) => {
    try {
      const classReq = new Requests();
      const artistas = await classReq.obterVariosArtistas();

      res.status(200).json(artistas);
    } catch (err) {
      console.log("obterVariosArtistas");
    }
  },

  //generos

  obterGeneros: async (req, res) => {
    try {
      const classReq = new Requests();
      const generos = await classReq.obterGeneros();
      res.status(200).json(generos);
    } catch (err) {
      console.log("obterGeneros");
    }
  },

  //tracks

  tracksPlaylist: async (req, res) => {
    try {
      const tracks = await classReq.tracksPlaylist(req.headers.hreftracks);
      res.status(200).json(tracks);
    } catch (err) {
      console.log("tracks err");
    }
  },

  tracksArtists: async (req, res) => {
    try {
      console.log(req.headers.id);
      const tracks = await classReq.tracksArtist(req.headers.id);
      res.status(200).json(tracks);
    } catch (err) {
      console.log("tracks err track artist");
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

  topTracksUser: async (req, res) => {
    try {
    } catch (err) {
      console.log("topTracksUser err");
    }
  },

  authConfirmado: async (req, res) => {
    try {
    } catch (err) {
      res.status(403).json(err);
    }
  },

  //pesquisa

  pesquisa: async (req, res) => {
    try {
      // const nameTrack = req.body.nameTrack;
      const result = await classReq.pesquisa(req.headers.nametrack);
      res.status(200).json(result);
    } catch (err) {
      console.log("err pesquisa");
    }
  },

  pesquisaTrack: async (req, res) => {
    try {
      const result = await classReq.pesquisaTrack(req.headers.nametrack);
      res.status(200).json(result);
    } catch (err) {
      console.log("err pesquisa track");
    }
  },

  pesquisaGenere: async (req, res) => {
    try {
      const result = await classReq.pesquisaGenere({
        genre: req.headers.genere,
        type: req.headers.type,
      });
      res.status(200).json(result);
    } catch (err) {
      console.log("err");
    }
  },
};

module.exports = spotifyController;
