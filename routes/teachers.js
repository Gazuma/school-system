const {application} = require('express');

const express = require('express');
const passport = require('passport');
const router = express.Router();
const Teacher = require('../models/teacher');

router.get('/login',(req,res)=>{
    res.render('teachers/login');
})
router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
    res.render('teachers/dashboard');
})
router.get('/logout',(req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    })
})

module.exports = router;