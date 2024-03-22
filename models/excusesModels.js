import db from "../database.js";

export const getAllExcuses = async () => {
  const [excuses] = await db.query("SELECT * FROM excuses");
  return excuses;
};

export const createExcuse = async (content) => {
  const result = await db.query("INSERT INTO excuses(content) VALUES(?)", [
    content,
  ]);
  if (result.affectedRows === 1) {
    return true; // Succès : l'excuse a été créée avec succès
  } else {
    throw new Error(
      "Une erreur s'est produite lors de la création de l'excuse."
    );
  }
};

// Fonction pour récupérer une excuse aléatoire depuis la base de données
export const getRandomExcuse = async () => {
  // Exécutez une requête SQL pour sélectionner une excuse aléatoire
  const result = await db.query(
    "SELECT * FROM excuses ORDER BY RAND() LIMIT 10"
  );

  // Récupérez l'excuse aléatoire à partir du résultat de la requête
  const randomExcuse = result[0];

  // Retournez l'excuse aléatoire
  return randomExcuse;
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
