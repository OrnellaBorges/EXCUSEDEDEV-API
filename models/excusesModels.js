import db from "../database.js";

export const getAllExcuses = async () => {
  const [excuses] = await db.query("SELECT * FROM excuses");
  return excuses;
};

// Fonction pour récupérer une excuse aléatoire depuis la base de données
export const getRandomExcuse = async () => {
  // Exécutez une requête SQL pour sélectionner une excuse aléatoire
  const result = await db.query(
    "SELECT * FROM excuses ORDER BY RAND() LIMIT 1"
  );

  /* const totalExcusesResult = await db.query(
    "SELECT COUNT(*) AS total FROM excuses"
  );
  const totalExcuses = totalExcusesResult[0].total;
  console.log("Nombre total d'excuses :", totalExcuses);

  // Générer un index aléatoire entre 1 et le nombre total de lignes
  const randomIndex = Math.floor(Math.random() * totalExcuses) + 1;
  console.log("Index aléatoire généré :", randomIndex);

  // Requête pour sélectionner la ligne correspondante à l'index aléatoire
  const randomExcuseQuery = await db.query(
    "SELECT * FROM excuses LIMIT 1 OFFSET ?",
    [randomIndex]
  );

  // Récupérer l'excuse aléatoire à partir du résultat de la requête
  const randomExcuse = randomExcuseQuery[0];

  console.log("Excuse aléatoire récupérée :", randomExcuse); */

  return result[0][0];
};

export const createExcuse = async (content) => {
  const result = await db.query("INSERT INTO excuses(content) VALUES(?)", [
    content,
  ]);
  console.log("result", result);
  console.log("result[0].affectedRows", result[0].affectedRows);
  if (result[0].affectedRows === 1) {
    return true; // Succès : l'excuse a été créée avec succès
  } else {
    throw new Error(
      "Une erreur s'est produite lors de la création de l'excuse."
    );
  }
};

/* export const getRandomExcuses = async () => {
  const [articles] = await db.query("SELECT * FROM quotes");
  return articles;
};

export const createExcuses = async () => {
  const [articles] = await db.query("SELECT * FROM quotes");
  return articles;
};
 */
