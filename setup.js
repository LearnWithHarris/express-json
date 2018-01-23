const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS Contact(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name STRING,
        company STRING,
        phone STRING,
        email STRING
    )`),
    db.run(`CREATE TABLE IF NOT EXISTS Address(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street STRING,
        city INTEGER,
        zip_code STRING,
        contact_id INTEGER,
        FOREIGN KEY (contact_id) REFERENCES Contact(id)
    )`)
})

db.close()