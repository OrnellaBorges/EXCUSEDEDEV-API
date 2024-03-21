import mysql from "mysql2";

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "excuses-db-test",
    port: 8889, /// ne jamais oublier ça sur mac !!!!!!!!!!!!!!!!!!!
  })
  .promise();
db.getConnection()
  .then(() => {
    console.log("Connexion établie avec la base de données");
  })
  .catch((err) => {
    console.log(err);
    console.log("Problème de Connexion avec la base de données.");
  });

export default db;
