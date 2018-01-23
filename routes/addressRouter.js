const express = require('express')
const router = express.Router()
const Address = require('../models/address.js')
const Contact = require('../models/contact.js')

router.get('/', (req, res)=>{
    Address.findAll((errAddress, rowAddress)=>{
        if(!errAddress){
            Contact.findAll((errContact, rowContact)=>{
                if(!errContact){
                    res.render('address', {address: rowAddress, contact: rowContact})
                    // res.send(rowAddress)
                }else{
                    res.send(errContact)
                }
            })
        }else{
            res.send(errAddress)
        }
    })
})
// INSERT
router.post('/', (req, res)=>{
    Address.create(req.body.street, req.body.city, req.body.zip_code, req.body.contact_id,(err, row)=>{
        if(!err){
            res.redirect('/addresses')
        }else{
            res.send(err)
        }
    })
})
//EDIT
router.get('/edit/:id', (req, res)=>{
    Address.findById(req.params.id, (errAddress, rowAddress)=>{
        if(!errAddress){
            Contact.findAll((errContact, rowContact)=>{
                if(!errContact){
                    res.render('addressEdit', {address: rowAddress, contact: rowContact})
                }else{
                    res.send(errContact)
                }
            })
        }else{
            res.send(errAddress)
        }
    })
})

router.post('/edit/:id', (req, res)=>{
    Address.update(req.body.street, req.body.city, req.body.zip_code, req.body.contact_id, req.params.id, (err, row)=>{
        if(!err){
            res.redirect('/addresses')
        }else{
            res.send(err);
        }
    })
})
//DELETE
router.get('/delete/:id', (req, res)=>{
    Address.destroy(req.params.id, (err, row)=>{
        if(!err){
            res.redirect('/addresses');
        }else{
            res.send(err);
        }
    })
})

module.exports = router