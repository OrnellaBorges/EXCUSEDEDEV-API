import express from "express";
import cors from "cors";
/* import db from "./database.js"; */
import {
  getAllExcuses,
  getRandomExcuse,
  addExcuse,
} from "./models/excusesModel.js";

const app = express();

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//ROUTES

// Route pour lister toutes les excuses
app.get("/api/allExcuses", async (req, res) => {
  try {
    console.log("je try");
    const allExcuses = await getAllExcuses();
    res.json(allExcuses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des excuses." });
  }
});

// Route pour lister toutes les excuses
app.get("/api/randomExcuse", async (req, res) => {
  try {
    const randomExcuse = await getRandomExcuse();
    res.json(randomExcuse);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des excuses." });
  }
});

// Route pour ajouter une excuse
app.post("/api/addExcuse", async (req, res) => {
  const { tag, message } = req.body;
  try {
    const newExcuseSucess = await addExcuse(tag, message);
    console.log("success", newExcuseSucess);
    res.status(201).json(newExcuseSucess);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'excuse." });
  }
});

//ROUTE

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ornella a cassé quelque chose !");
});

//NB : ce port que j'ai créé => branché sur notre appli
const port = 5000;
app.listen(port, () => {
  console.log(`le server ecoute sur le port ${port}`);
});
