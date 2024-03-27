import express from "express";
import cors from "cors";

import db from "./database.js";
import {
  getAllExcuses,
  getRandomExcuse,
  createExcuse,
} from "./models/excusesModels.js";

const app = express();

// MIDDLEWARE
app.use(express.json());
// tres important ! permet de convertir les donneés à envoyer au format json a la bdd

// app est l'intance d'express on a tout mis express dans la variable app
//console.log(app.listen); //app.listen permet de creer le server si on regarde ce qu'il y a dedans on va trouver toutes les fonctions native lié a express

// branchement à la base de données on a besoin d'une librairie en plus in faut installer

app.use(
  cors({
    origin: "http://localhost:3000", // Autoriser les requêtes depuis ce domaine
  })
);
//ROUTES
app.get("/api/excuses/random", async (req, res, next) => {
  try {
    console.log("je suis la ");
    // Récupérer une excuse aléatoire depuis la base de données
    const randomExcuse = await getRandomExcuse();
    console.log(randomExcuse);
    // Envoyer l'excuse aléatoire comme réponse
    res.status(200).json(randomExcuse);
  } catch (error) {
    next(error);
  }
});

// route qui recup toutes les excuses
app.get("/api/excuses", async (req, res, next) => {
  // on met async devant la fonction anonyme pour dire attention cette partie de la fonction est asynchrone
  try {
    const excuses = await getAllExcuses();
    res.status(200).json(excuses); // permet d'envoyer au front les données
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// route pour recup 1 excuse par l'id
app.get("/api/excuses/:id", async (req, res, next) => {
  // req res next sont des objets les : sont des variables
  let [excuse] = await db.query("SELECT * FROM excuses WHERE id = ?", [
    req.params.id,
  ]);

  // le ? sert a proteger les donnees, fait une requet preparé
  // [] => le deuxième paramettre est optionnel ici on a besoin de l'id alors on met req.params.id

  console.log(req.params.id);

  res.send(excuse[0]);
  // permet d'envoyer au front les données d'un seul article en l'occurence le deuxième element parmis les articles
});

//Creation ou sauvegarde d'une excuse
app.post("/api/excuses/create", async (req, res, next) => {
  const { content } = req.body;
  console.log("je suis dans server", content);
  try {
    const success = await createExcuse(content);
    console.log("success", success);
  } catch (error) {
    console.log("je suis dans catch");
    console.log(error);
    next(error);
  }
});

async function addExcuse(req, res) {
  const { tag, message } = req.body;
  if (!tag || !message) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir tous les champs requis." });
  }

  try {
    await excuseModel.addExcuse(tag, message);
    res.status(201).send("Excuse ajoutée avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'excuse :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'excuse." });
  }
}

// OBTENIR UNE EXCUSE ALEATOIRE
//app.get("/api/excuses/getrandom", async (req, res, next) => {

/* // SUPPRIMER UNE EXCUSE
app.delete("/api/articles/delete/:id", async (req, res, next) => {
  try {
    const [excuse] = await db.query("SELECT * FROM excuses WHERE id = ?", [
      req.params.id,
    ]);
    if (article[0]) {
      let deleteExcuse = await db.query("DELETE FROM excuses WHERE id = ?", [
        req.params.id,
      ]);
      res.status(200).json("L'article à bien été supprimé");
    } else {
      res.status(404).json("Cet article n'existe pas");
    } */

//Méthode plus actuelle et qui consomme moins de lignes

/* const [article] = await db.query("SELECT * FROM articles WHERE id = ?", [req.params.id]); // il interroge la bdd si il existe ou pas
        if(!article[0]) return res.status(404).json("Cet article n'existe pas"); 
        
        // si il existe pas on envoi un message 
        let deleteArticle = await db.query("DELETE FROM articles WHERE id = ?", [req.params.id])
        res.status(200).json("L'article à bien été supprimé") 
  } catch (error) {
    next(error);
  }
});*/

/* // MODIFIER UN ARTICLE = mise a jour
app.put("/api/articles/update/:id", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    let updateExcuse = db.query(
      "UPDATE articles SET content = ?, updatedAt = NOW() WHERE id = ?",
      [content, req.params.id]
    );
    res.status(200).json("L'article est modifié");
  } catch (error) {
    next(error);
  }
}); */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ornella a cassé quelquechose !");
});

//NB : ce port que j'ai créé => branché sur notre appli
const port = 5000;
app.listen(port, () => {
  console.log(`le server ecoute sur le port ${port}`);
});
