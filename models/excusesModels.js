import db from "../database.js";

export const getAllExcuses = async () => {
  const [articles] = await db.query("SELECT * FROM excuses");
  return articles;
};

export const getRandomExcuses = async () => {
  const [articles] = await db.query("SELECT * FROM quotes");
  return articles;
};

export const createExcuses = async () => {
  const [articles] = await db.query("SELECT * FROM quotes");
  return articles;
};
