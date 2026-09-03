function ensure_authentication(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    // FIX: Render the login page directly instead of redirecting.
    // This stops the infinite redirect loop (ERR_TOO_MANY_REDIRECTS).
    return response.status(401).render('auth/login', { 
        error: 'Your session has expired or you are not logged in. Please log in again.' 
    });
}

function ensure_guest(request, response, next){
    if(!request.isAuthenticated()){
        return next();
    }
    return response.redirect('/dashboard');
}

module.exports = { ensure_authentication, ensure_guest };