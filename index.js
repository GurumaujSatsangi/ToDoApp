import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js'





dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/login",(req,res)=>{
    res.render("login.ejs", { message: null });
})

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
})



app.post("/login", async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email_id", email)
            .single();
            
        
        if (error || !user) {
            return res.render("login.ejs", {
                message: "Email ID is not registered, please try again with a valid Email ID"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.render("login.ejs", {
                message: "Invalid Password, please try again"
            });
        }

        return res.render("home.ejs");
        
    } catch (err) {
        console.error("Login error:", err);
        return res.render("login.ejs", {
            message: "An error occurred during login. Please try again."
        });
    }
})

app.listen(process.env.PORT,()=>{
    console.log("Running on Port 3000!");
})
