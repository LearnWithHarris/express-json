const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const addressRouter = require("./routes/addressRouter.js")
const contactRouter = require("./routes/contactRouter.js")

app.use('/addresses', addressRouter)
app.use('/contacts', contactRouter)

app.listen(3000 ,()=> console.log("di 3000 gan cekidot"))