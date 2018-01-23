const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//LIST
app.get('/', (req, res)=>{
    res.render('list');
    // db.all(`SELECT * FROM Contact`, (errContact, rowContact)=>{
    //     res.render('list', {rowContact})
    // })
})

//CONTACT ========================================
app.get('/contacts', (req, res)=>{
    db.all(`SELECT * FROM Contact`, (err, row)=>{
        if(!err){
            res.render('contact', {contact: row})
            // res.send(row.length)
            // console.log(row.length)
        }else{
            console.log(err)
        }
    })
})
//                                          INSERT
app.post('/contacts', (req, res)=>{
    db.run(`INSERT INTO Contact(name, company, phone, email)
    VALUES("${req.body.name}", "${req.body.company}", ${req.body.phone}, "${req.body.email}")`, (err, row)=>{
        if(!err){
            res.redirect('/contacts')
        }else{
            console.log(err);
        }
    })
})
//                                          EDIT
app.get('/contacts/edit/:id', (req, res)=>{
    db.all(`SELECT * FROM Contact WHERE id = ${req.params.id}`,(err, row)=>{
        if(!err){
            res.render('contactEdit', {contact: row})
            // res.send(`${req.params.id} ini ngetest`);
        }else{
            console.log(err)
        }
    })
})
app.post('/contacts/edit/:id', (req, res)=>{
    db.all(`UPDATE Contact
    SET name = "${req.body.name}", company = "${req.body.company}", phone = ${req.body.phone}, email = "${req.body.email}" 
    WHERE id = ${req.params.id}`,(err, row)=>{
        if(!err){
            res.redirect('/contacts')
        }else{
            console.log(err);
        }
    })
})
//                                          DELETE
app.get('/contacts/delete/:id', (req, res)=>{
    db.all(`DELETE FROM Contact
    WHERE id = ${req.params.id} `,(err, row)=>{
        if(!err){
            res.redirect('/contacts')
        }else{
            console.log(err)
        }
    })
})



//ADDRESS =========================================
app.get('/addresses', (req, res)=>{
    db.all(`SELECT Address.*, Contact.name 
    FROM Address
    LEFT JOIN Contact
    ON Address.contact_id = Contact.id
    `, (errAddress, rowAddress)=>{
        if(!errAddress){
            db.all(`SELECT * FROM Contact`, (errContact, rowContact)=>{
                if(!errContact){
                    res.render('address', {contact: rowContact,address: rowAddress})
                }else{
                    console.log(errContact)
                }
            })
        }else{
            console.log(errAddress)
        }
    })
})
// app.get('/addresses', (req, res)=>{
//     db.all(`SELECT * FROM Address`, (err, row)=>{
//         if(!err){
//             res.render('address', {address: row})
//             // res.send(row)
//             // console.log(row.length)
//         }else{
//             console.log(err)
//         }
//     })
// })
//                                          INSERT
app.post('/addresses', (req, res)=>{
    db.run(`INSERT INTO Address(street, city, zip_code, contact_id)
    VALUES("${req.body.street}", "${req.body.city}", ${req.body.zip_code}, ${req.body.contact_id})`, (err, row)=>{
        if(!err){
            res.redirect('/addresses')
        }else{
            console.log(err);
        }
    })
})
//                                          EDIT
app.get('/addresses/edit/:id', (req, res)=>{
    db.all(`SELECT * FROM Address WHERE id = ${req.params.id}`,(err, row)=>{
        if(!err){
            res.render('addressEdit', {address: row})
            // res.send(`${req.params.id} ini ngetest`);
        }else{
            console.log(err)
        }
    })
})
app.post('/addresses/edit/:id', (req, res)=>{
    db.all(`UPDATE Address
    SET street = "${req.body.street}", city = "${req.body.city}", zip_code = ${req.body.zip_code},  contact_id = ${req.body.contact_id} 
    WHERE id = ${req.params.id}`,(err, row)=>{
        if(!err){
            res.redirect('/addresses')
        }else{
            console.log(err);
        }
    })
})
//                                          DELETE
app.get('/addresses/delete/:id', (req, res)=>{
    db.all(`DELETE FROM Address
    WHERE id = ${req.params.id} `,(err, row)=>{
        if(!err){
            res.redirect('/addresses')
        }else{
            console.log(err)
        }
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))