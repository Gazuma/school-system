const mongoose = require('mongoose');
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const student = require('./models/student');
const activity = require('./models/activity');
mongoose.connect('mongodb://localhost:27017/school-system',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Connection error : '));
db.once('open',()=>{
    console.log("connected");
})

const app = express();

app.engine('ejs',ejsMate);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/student_profile/:id/activity',async(req,res)=>{
    const {id} = req.params;
    const record = await student.findById(id).populate('activities');
    console.log(record);
    res.render('new-activity',{record});
})

app.get('/dashboard',async(req,res)=>{
    const students = await student.find({});
    res.render('dashboard',{students});
})

app.get('/student/:id',async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    const record = await student.findById(id).populate('activities');
    console.log(record);
    const n = Object.keys(record).length;
    console.log(record.activities);
    console.log(n);
    res.render('student_profile',{record});
})

app.get('/addstudent',(req,res)=>{
    res.render('addstudent');
})

app.post('/addstudent',async(req,res)=>{
    const student_record = new student(req.body.Student);
    await student_record.save();
    res.redirect('/dashboard');
})

app.post('/student_profile/:id',async(req,res)=>{
    try{
        
        const {id}=req.params;
        
        const st = await student.findById(id);
        console.log("here");
        const len = Object.keys(st).length;
        if(len==0){
            const student_record = new student(req.body.Student);
            const Activity = new activity(req.body.Activity);
            student_record["totalhours"]+=Activity["hours"];
            //console.log(Activity);
            student_record["activities"].push(Activity);
            await Activity.save();
            await student_record.save();
            res.redirect('/dashboard');
        }
        else{
            const student_record = await student.findById(id);
            const Activity = new activity(req.body.Activity);
            student_record["totalhours"]+=Activity["hours"];
            student_record["activities"].push(Activity);
            await student_record.save();
            await Activity.save();
        console.log(Activity);
        await student_record.save();
        res.redirect('/dashboard');
        }
        //console.log(student_record);
        

        // for(let record of student_record.activities){
        //     console.log(record.title);
        //     console.log(record.description);
        // }
        
    } catch(e){
        console.log(e);
    }
})



app.get('/login',(req,res)=>{
    res.render('login');
})

app.delete("/:id",async(req,res)=>{
    const{id} = req.params;
    await student.findByIdAndDelete(id);
    res.redirect('/dashboard');
})

app.listen(3000,()=>{
    console.log('listening on port 3000');
})