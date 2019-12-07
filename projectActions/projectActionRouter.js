const express = require("express");

const router = express.Router();

const ActionsDb = require("../data/helpers/actionModel");
const ProjectsDb = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/:id", (req, res) => {
  const { id } = req.params;
  ActionsDb.get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error while getting project actions." });
    });
});

router.post("/:id", (req, res) => {
  const newAction = {
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes
  };
  ActionsDb.insert(newAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error while saving new project action." });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const editedAction = {
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes
  };
  ActionsDb.update(id, editedAction)
    .then(() => {
      ActionsDb.get(id)
        .then(action => {
          res.status(200).json(action);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "Internal error while getting updated project action."
          });
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error while updating project action." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  ActionsDb.get(id)
    .then(action => {
      ActionsDb.remove(id)
        .then(() => {
          res.status(200).json(action);
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: "Internal error while deleting project action." });
        });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Internal error while deleting project action." });
    });
});

module.exports = router;
