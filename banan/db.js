const sqlite3 = require('better-sqlite3');
const path = require('path');

// Vytvořte cestu k databázovému souboru v kořenovém adresáři projektu
const dbFilePath = path.join(process.cwd(), 'database.sqlite');

// Připojte se k databázi
const db = new sqlite3(dbFilePath);

// Vytvoření tabulky uživatelů, pokud ještě neexistuje
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

module.exports = db;
