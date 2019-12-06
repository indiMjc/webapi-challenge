const express = require("express");

const server = express();

server.get("/", (req, res) => {
  const msg = "Server Running!";
  res.send(msg);
});

module.exports = server;
