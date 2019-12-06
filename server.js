const express = require("express");

const server = express();

const projectRouter = require("./projects/projectRouter");
const actionsRouter = require("./projectActions/projectActionRouter");

server.use(express.json());
server.use("/projects", projectRouter);
server.use("/actions", actionsRouter);

server.get("/", (req, res) => {
  const msg = "Server Running!";
  res.send(msg);
});

module.exports = server;
