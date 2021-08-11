require('dotenv').config()
const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');
const cookieParser=require('cookie-parser');
const users=require('./models/users');
const auth = require('./middleware/auth');
require('./db/conn');
const app=express();
const port =process.env.PORT || 8001;

app.use(express.static(path.join(__dirname,'static')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.set('view engine','handlebars');

app.engine('handlebars',exphbs());

app.get('/',auth,(req,res)=>{
    if(req.flag)
    {
        res.render('success',{
            msg:"You have already submitted the form."
        });
    }
    else
    {
        res.render('index');
    }
})

app.post('/form',async (req,res)=>{
    try {
        let newUser=new users({
            name:req.body.name,
            age:req.body.age
        })
        let saveUser=await newUser.save();
        let token=await newUser.generateAuthToken();
        console.log(token);
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+78948645),
            httpOnly:true
        });
        res.render('success',{
            msg:"Form submitted successfully."
        });
    } catch (error) {
        res.render('index');
    }
})

app.get('/form',auth,(req,res)=>{
    if(req.flag)
    {
        res.render("success",{
            msg:"You have already submitted the form."
        })
    }
    else
    {
        res.render('index');
    }
})

app.listen(port,()=>{
    console.log("Listening..");
})