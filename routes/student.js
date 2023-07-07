const express = require('express');
const router = express.Router();
const student = require('../models/student');

router.get('/',async(req,res)=>{
    const students = await student.find({});
    res.render('dashboard',{students});
})