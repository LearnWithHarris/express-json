const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.js')


router.get('/', (req, res)=>{
    Contact.findAll((err, row)=>{
        if(!err){
            res.render('contact', {contact: row})
        }else{
            res.send(err)
        }
    })
})
// INSERT
router.post('/', (req, res)=>{
    Contact.create(req.body.name, req.body.company, req.body.phone, req.body.email, (err, row)=>{
        if(!err){
            res.redirect('/contacts')
        }else{
            res.send(err)
        }
    })
})
//EDIT
router.get('/edit/:id', (req, res)=>{
    Contact.findById(req.params.id, (err, row)=>{
        if(!err){
            res.render('contactEdit', {contact: row})
        }else{
            res.send(err)
        }
    })
})

router.post('/edit/:id', (req, res)=>{
    Contact.update(req.body.name, req.body.company, req.body.phone, req.body.email, req.params.id, (err, row)=>{
        if(!err){
            res.redirect('/contacts')
        }else{
            res.send(err);
        }
    })
})
//DELETE
router.get('/delete/:id', (req, res)=>{
    Contact.destroy(req.params.id, (err, row)=>{
        if(!err){
            res.redirect('/contacts');
        }else{
            res.send(err);
        }
    })
})
module.exports = router;