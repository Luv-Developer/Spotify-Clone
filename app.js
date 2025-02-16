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
app.listen(port,()=>{
    console.log(`App is listening at ${port}`)
})
