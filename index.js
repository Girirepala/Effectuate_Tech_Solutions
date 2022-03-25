const express = require("express");
const path = require("path");


const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "database.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("DB conceted...");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/:id", async (request, response) => {
  let regNum = request.params['id']
  console.log(regNum)
  const getQuery = `
    SELECT
      *
    FROM
      cars_info
    WHERE 
      registrationNumber ="${regNum}";`;
    
  const resultArray = await db.get(getQuery);
  resultArray===undefined?response.send(`<h1>Please Enter the Correct Vehicle Number</h1>`):response.send(resultArray);
    // response.send(resultArray);
    console.log(resultArray)
});

