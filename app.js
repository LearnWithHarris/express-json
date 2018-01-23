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

//CONTACT 
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
app.post('/contacts/edit/:id')

app.listen(3000, () => console.log('Example app listening on port 3000!'))