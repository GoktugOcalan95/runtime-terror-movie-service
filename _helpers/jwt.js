const expressJwt = require('express-jwt');
const config = require('config');
const userService = require('../services/user.service.js');

module.exports = jwt;

function jwt() {
    const secret = config.get('jwtsecret');
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/register',
            '/api/movies/list',
            '/api/lp'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    const unauthorizedError = {
        name: "UnauthorizedOperationError",
        status: 403
    }

    //admin only routes
    switch(req.url){
        case '/api/users/list':
            if(user.role != 'admin'){
                return done(unauthorizedError, true);
            }
            break;
    }

    done();
};