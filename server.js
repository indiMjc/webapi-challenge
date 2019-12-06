const express = require("express");

const server = express();

const projectRouter = require("./projects/projectRouter");

server.use(express.json());
server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  const msg = "Server Running!";
  res.send(msg);
});

module.exports = server;
