import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
})



app.post("/login", (req,res)=>{
    const {email, password} = req.body;

})

app.listen(process.env.PORT,()=>{
    console.log("Running on Port 3000!");
})
