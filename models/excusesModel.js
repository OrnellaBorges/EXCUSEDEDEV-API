import db from "../database.js";

export const getAllExcuses = async () => {
  try {
    const [excuses] = await db.query("SELECT * FROM excuseTable");
    console.log(excuses);
    return excuses;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de toutes les excuses :",
      error
    );
    throw error;
  }
};

export const getRandomExcuse = async () => {
  try {
    const [randomExcuse] = await db.query(
      "SELECT * FROM excuseTable ORDER BY RAND() LIMIT 1"
    );
    return randomExcuse[0];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération d'une excuse aléatoire :",
      error
    );
    throw error;
  }
};

export const addExcuse = async (tag, message) => {
  try {
    const queryResult = await db.query(
      "INSERT INTO excuseTable(tag, message) VALUES (?, ?)",
      [tag, message]
    );
    console.log("Query result:", queryResult);
    if (queryResult[0].affectedRows === 1) {
      return true; // Succès : l'excuse a été ajoutée avec succès
    } else {
      throw new Error("Une erreur s'est produite lors de l'ajout de l'excuse.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'excuse :", error);
    throw error;
  }
};
