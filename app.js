const express = require("express")
const app = express()
const port = 3000
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
//Database Connectivity 
const {createClient} = require("@supabase/supabase-js")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.use(cookieParser())

//Database API and key
const supabaseurl = "https://bqpnzguzwabqkmrrijit.supabase.co"
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcG56Z3V6d2FicWttcnJpaml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjUxMzYsImV4cCI6MjA1MzMwMTEzNn0.l_n4gah7shANQP0WMPcZkCFkiv5LGiW1LNTValeK1ak"
const supabase = createClient(supabaseurl,supabasekey)

//Routes 
app.get("/",(req,res)=>{
    res.render("spotify")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    const saltround = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,saltround)
    const user = await supabase
    .from("users2")
    .insert([{email:email,password_hash:hashedpassword}])
    .select()
    if(user){
    const token = jwt.sign({email},"hehe")
    res.cookie("token",token)
    res.redirect("/login")
    }
    else{
        res.redirect("/signup")
    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
    const {password,email} = req.body
    const {data:user} = await supabase
    .from("users2") // will go in inside the users2 table 
    .select("*") // will select all the records inside the table 
    .eq("email",email) // will checkt the email
    .single() 
    if(user){
        const passwordvalid = await bcrypt.compare(password,user.password_hash)
        if(!passwordvalid){
            return res.redirect("/login")
        }
        else{
            let token = jwt.sign({email},"hehe")
            res.cookie("token",token)
            return res.redirect("/")
        }
    }
    else{
        res.redirect("/signup")
    }
})
app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})
