const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./database/database.db')

class Address{
    constructor(){}
    
    static findAll(callback){
        db.all(`SELECT Address.*, Contact.name 
        FROM Address
        LEFT JOIN Contact
        ON Address.contact_id = Contact.id
        `, (err, row)=>{
            if(!err){
                callback(null ,row)
            }else{
                callback(err, null)
            }
        })
    }

    static findById(id, callback){
        db.all(`SELECT Address.*, Contact.name 
        FROM Address
        LEFT JOIN Contact
        ON Address.contact_id = Contact.id
        WHERE Address.id = ${id}`,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

    static create(street, city, zip_code, contact_id, callback){
        db.run(`INSERT INTO Address(street, city, zip_code, contact_id)
        VALUES("${street}", "${city}", ${zip_code}, ${contact_id})`, (err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
    })
    }

    static update(street, city, zip_code, contact_id, id, callback){
        db.all(`UPDATE Address
        SET street = "${street}", city = "${city}", zip_code = ${zip_code}, contact_id = ${contact_id}
        WHERE id = ${id}`,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

    static destroy(id, callback){
        db.all(`DELETE FROM Address
        WHERE id = ${id} `,(err, row)=>{
            if(!err){
                callback(null, row)
            }else{
                callback(err, null)
            }
        })
    }

}

module.exports = Address