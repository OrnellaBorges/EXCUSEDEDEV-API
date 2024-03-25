// ExcuseRoutes.js

import express from "express";
import {
  getRandomExcuse,
  getAllExcuses,
  createExcuse,
} from "./models/excusesModels.js";

const router = express.Router();

router.get("/random", async (req, res, next) => {
  try {
    const randomExcuse = await getRandomExcuse();
    res.status(200).json(randomExcuse);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const excuses = await getAllExcuses();
    res.status(200).json(excuses);
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { content } = req.body;
  try {
    const success = await createExcuse(content);
    res.status(201).json({ message: "L'excuse a été créée avec succès." });
  } catch (error) {
    next(error);
  }
});

export default router;
