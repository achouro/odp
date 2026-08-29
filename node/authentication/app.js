/////// app.js
require('dotenv').config();
const path = require("node:path");

const { Pool } = require("pg");
const express = require("express");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const bcrypt=require('bcryptjs');


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  //password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));

app.use(passport.initialize())
app.use(passport.session());


app.get("/", (request, response) => {
    response.render("index", {user:request.user});
});

app.get('/sign_up', (request, response)=>{
    response.render('signup_form')
})

app.post('/sign_up', async (request, response, next)=>{
    try{
        const hashed_password=await bcrypt.hash(request.body.password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', 
            [request.body.username, hashed_password,]);

        response.redirect('/')
        
    }
    catch(error){
        return next(error);
    }
})


passport.use(
    new LocalStrategy(async(username, password, done)=>{
        try{
            const {rows}=await pool.query('SELECT * FROM users WHERE username=$1', [username]);
            const user=rows[0];

            if(!user){
                return done( null, false, {message: 'Incorrect username'});
            }

            const match=bcrypt.compare(password, user.password)
            if(!match){
                return done(null, false, {message:'Incorrect password'});
            }
            //return the user
            return done(null, user);
        }
        catch(error){
            return done(error);
        }
    })
)

passport.serializeUser((user, done)=>{ done(null, user.id)})

passport.deserializeUser( async (id, done)=>{ 
    try{
        const {rows}= await pool.query('SELECT * FROM users WHERE id=$1', [id])
        const user=rows[0];

        done(null, user)
    }
    catch(error){
        done(error);
    }
})
app.get('/login', (request, response)=>{
    response.render('login_form')
} )
app.post('/login', 
         passport.authenticate('local', {
            successRedirect:'/',
            successMessage:'Succesfully logged in!',
            failureRedirect: '/',
            failureMessage:true,
         })
         
)

app.get('/logout', (request, response)=>{
    request.logout((error)=>{
        if(error){
            return next(error);
        }
        response.redirect('/');
    })
} )

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
