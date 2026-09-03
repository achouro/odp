function ensure_authentication(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.status(401).json({error:'Unauthorised. Please log in.'})
}

function ensure_guest(request, response, next){
    if(!request.isAuthenticated()){
        return next();
    }
    response.status(400).json({error:'Alreeady authenticated.'})
}
module.exports={ ensure_authentication, ensure_guest}