const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./database/database.db')

class Contact{
    constructor(){}
    
    static findAll(callback){
        db.all(`SELECT * FROM Contact`, (err, row)=>{
            if(!err){
                callback(null ,row)
            }else{
                callback(err, null)
            }
        })
    }

    static findById(id, callback){
        db.all(`SELECT * FROM Contact WHERE id = ${id}`,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

    static create(name, company, phone, email, callback){
        db.run(`INSERT INTO Contact(name, company, phone, email)
        VALUES("${name}", "${company}", ${phone}, "${email}")`, (err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
    })
    }

    static update(name, company, phone, email, id, callback){
        db.all(`UPDATE Contact
        SET name = "${name}", company = "${company}", phone = ${phone}, email = "${email}" 
        WHERE id = ${id}`,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

    static destroy(id, callback){
        db.all(`DELETE FROM Contact
        WHERE id = ${id} `,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

}

module.exports = Contact