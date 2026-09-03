const bcrypt = require('bcryptjs');
const passport = require('passport');
const prisma = require('../config/database');

async function register(request, response){
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

        const new_user=await prisma.user.create({
            data:{username, password:hashed_password},
            select:{id: true, username: true}
        })
        return response.redirect('/auth/login');

        //response.status(201).json({message:'User created successfully.', user: new_user});
        

    }
    catch(error){
        response.status(500).json({error:error.message})
    }
}

async function login(request, response, next){

    passport.authenticate('local', (error, user, info)=>{
        if(error){ return next(error);}
        if(!user) { return response.status(400).json({ error: info.message || 'Login failed.' });}
    
        request.login(user, (error)=>{
            if(error){return next(error)};
            return response.json({ message:'Logged in successfully.', 
                              user:{id:user.id, username:user.username}
             });
        })

    })(request, response, next);

    return response.redirect('/dashboard');
}

async function logout(request, response, next){
    request.logout((error)=>{
        if(error){return error(next);}

        request.session.destroy(()=>{
            response.clearCookie('connect.sid');
            response.json({message:'Logged out successfully'});
        })
    
    })
}

async function get_me(request, response){
    response.json({user:request.user});
}

module.exports={register, login, logout, get_me}