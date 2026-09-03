const bcrypt = require('bcryptjs');
const passport = require('passport');
const prisma = require('../config/database');

async function register(request, response, next){
    try{
        const {username, password}= request.body;
        if(!username || !password){
            return response.status(400).json({error:'Username and password required.'})
        }

        const existing_user=await prisma.user.findUnique({where:{username}});
        if(existing_user){
            return response.status(400).json({error:'Username already taken.'})
        };

        const hashed_password= await bcrypt.hash(password, 10);

        await prisma.user.create({
            data:{username, password:hashed_password},
            select:{id: true, username: true}
        });
        return response.redirect('/auth/login');
    }
    catch(error){
        return next(error);
    }
}

async function login(request, response, next){
    passport.authenticate('local', (error, user, info) => {
        if(error){ return next(error); }
        if(!user) { 
            return response.status(400).render('auth/login', { 
                error: info?.message || 'Login failed.' 
            });
        }
        
        request.login(user, (error) => {
            if(error){ return next(error); }
            return response.redirect('/dashboard');
        });
    })(request, response, next);
}

async function logout(request, response, next){
    request.logout((error)=>{
        if(error){ return next(error); }

        request.session.destroy(()=>{
            response.clearCookie('connect.sid');
            return response.redirect('/auth/login');
        });
    });
}

async function get_me(request, response){
    return response.json({user:request.user});
}

module.exports={register, login, logout, get_me};