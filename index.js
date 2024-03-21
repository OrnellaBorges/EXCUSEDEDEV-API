import express from "express";
import db from "./database.js";
import { getAllExcuses } from "./models/excusesModels.js";

const app = express();

// MIDDLEWARE
app.use(express.json()); // tres important ! permet de convertir les donneés à envoyer au format json a la bdd

// app est l'intance d'express on a tout mis express dans la variable app
//console.log(app.listen); //app.listen permet de creer le server si on regarde ce qu'il y a dedans on va trouver toutes les fonctions native lié a express

// branchement à la base de données on a besoin d'une librairie en plus in faut installer

//ROUTES

// route qui recup tous les articles
app.get("/api/excuse", async (req, res, next) => {
  // on met async devant les arguments pour dire attention cette partie de la fonction est asynchrone
  try {
    const articles = await getAllExcuses();
    res.status(200).json(articles); // permet d'envoyer au front les données
  } catch (error) {
    next(error);
  }
});

// route pour recup 1 article
app.get("/api/quotes/:id/", async (req, res, next) => {
  // req res next sont des objets les : sont des variables
  let [article] = await db.query("SELECT * FROM articles WHERE id = ?", [
    req.params.id,
  ]);

  // le ? sert a proteger les donnees, fait une requet preparé
  // [] => le deuxième paramettre est optionnel ici on a besoin de l'id alors on met req.params.id

  console.log(req.params.id);

  res.send(article[0]);
  // permet d'envoyer au front les données d'un seul article en l'occurence le deuxième element parmis les articles
});

//Creation ou sauvegarde d'une excuse
app.post("/api/articles/create", async (req, res, next) => {
  const { content } = req.body;
  try {
    let newExcuse = await db.query("INSERT INTO excuse(content) VALUES(?)", [
      content,
    ]);
    res.status(200).json("RAS les copains! l'article est bien créé.");
  } catch (error) {
    next(error); // permet de recuperer le middleware créé a la fin c'est un racourcis pour ne pas tout ecrire
  }
});

// SUPPRIMER UN ARTICLE
app.delete("/api/articles/delete/:id", async (req, res, next) => {
  try {
    const [article] = await db.query("SELECT * FROM articles WHERE id = ?", [
      req.params.id,
    ]);
    if (article[0]) {
      let deleteArticle = await db.query("DELETE FROM articles WHERE id = ?", [
        req.params.id,
      ]);
      res.status(200).json("L'article à bien été supprimé");
    } else {
      res.status(404).json("Cet article n'existe pas");
    }

    //Méthode plus actuelle et qui consomme moins de lignes

    /* const [article] = await db.query("SELECT * FROM articles WHERE id = ?", [req.params.id]); // il interroge la bdd si il existe ou pas
        if(!article[0]) return res.status(404).json("Cet article n'existe pas"); 
        
        // si il existe pas on envoi un message 
        let deleteArticle = await db.query("DELETE FROM articles WHERE id = ?", [req.params.id])
        res.status(200).json("L'article à bien été supprimé") */
  } catch (error) {
    next(error);
  }
});

// MODIFIER UN ARTICLE = mise a jour

app.put("/api/articles/update/:id", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    let updateArticle = db.query(
      "UPDATE articles SET title = ?, content = ?, updatedAt = NOW() WHERE id = ?",
      [title, content, req.params.id]
    );
    res.status(200).json("L'article est modifié");
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ornella a cassé quelquechose !");
});

//NB : ce port que j'ai créé => branché sur notre appli
const port = 7777;
app.listen(port, () => {
  console.log(`le server ecoute sur le port ${port}`);
});
