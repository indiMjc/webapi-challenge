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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  ProjectDb.getById(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal error while getting project." });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  ProjectDb.insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal error while saving project." });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  ProjectDb.update(id, req.body)
    .then(() => {
      ProjectDb.getById(id)
        .then(project => {
          res.status(200).json(project);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Internal error while getting project after update."
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal error while updating project." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ProjectDb.getById(id)
    .then(project => {
      ProjectDb.remove(id)
        .then(() => {
          res.status(200).json(project);
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: "Internal error while deleting project." });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal error while deleting project." });
    });
});

module.exports = router;
