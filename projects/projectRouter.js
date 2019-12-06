const express = require("express");

const router = express.Router();

const ProjectDb = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  ProjectDb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error while fetching projects." });
    });
});

module.exports = router;
