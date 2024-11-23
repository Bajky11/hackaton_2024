const sqlite3 = require('better-sqlite3');
const path = require('path');

// Vytvořte cestu k databázovému souboru v kořenovém adresáři projektu
const dbFilePath = path.join(process.cwd(), 'database.sqlite');

// Připojte se k databázi
const db = new sqlite3(dbFilePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS user_sas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sas_name TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password) VALUES (?, ?, ?)
`);
insertUser.run('Lukas Bajer', 'lukas@example.com', 'admin');

module.exports = db;
