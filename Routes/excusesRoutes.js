const express = require("express");
const router = express.Router();
const Excuse = require("../models/excusesModel");

// Route pour lister toutes les excuses
router.get("/excuses", async (req, res) => {
  try {
    const excuses = await Excuse.findAll();
    res.json(excuses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des excuses." });
  }
});

// Route pour ajouter une excuse
router.post("/excuses", async (req, res) => {
  const { http_code, tag, message } = req.body;
  try {
    const newExcuse = await Excuse.create({ http_code, tag, message });
    res.status(201).json(newExcuse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'excuse." });
  }
});

module.exports = router;
