const express= require("express");
const axios = require("axios");
const bodyParser= require("body-parser");
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { collection } = require("./db");
const mongoStore= require("connect-mongo");
const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    },
    store: new mongoStore({
        mongoUrl:'mongodb://127.0.0.1:27017/newsWebsite',
        collection:'sessions',
        ttl:100*60*10
    })
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const isAuth=(req,res,next)=>{
    const user=req.session.user;
    console.log(user);
    if(user){
        console.log("auth");
        next();
    }
    else{
        console.log("not auth user");
        req.session.destroy();
        res.status(401).json({succes:false,message:"Unauthorized"});
    }
}
app.post("/api",isAuth,async (req,res)=>{
    console.log(req.body.cat);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${req.body.cat}&apiKey=26558061eaee4ac58bee7ff8d14ed7dc`;
    try{
    let r = await axios(url);
    let a = await r.data;
    res.send(a);}
    catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
})


app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    console.log("email in the login "+ email + " " + password);
    try{
        const check = await collection.findOne({email:email})
        if(check){
            req.session.user = { email: check.email};
          
            res.json("exist");
        }
        else{
            res.json("notexist");
        }
    }
    catch(e){
         res.json("notexist");
    }
})

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.json("Log out");
})

app.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    console.log("email in the signup "+ email);
    const data ={
        name:name,
        email:email,
        password:password
    }
    try{
        const check = await collection.findOne({email:email})
        
        if(check){
            res.json("exist");
        }
        else{
            await collection.insertMany([data]);
            req.session.user = { email: data.email};
            res.json("notexist");
        }
    }
    catch(e){
        res.json("notexist");
    }
})

app.listen("8080",()=>{
    console.log("Server running on port 8080");
})