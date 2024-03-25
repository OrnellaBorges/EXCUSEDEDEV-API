import express from "express";
import cors from "cors";
import excuseRoutes from "./excuseRoutes.js"; // Importation des routes d'excuses

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Utilisation des routes d'excuses
app.use("/api/excuses", excuseRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ornella a cassé quelque chose !");
});

const port = 5000;
app.listen(port, () => {
  console.log(`le serveur écoute sur le port ${port}`);
});
