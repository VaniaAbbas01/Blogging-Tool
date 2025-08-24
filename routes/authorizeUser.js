const jwt = require('jsonwebtoken')
require("dotenv").config()


// define middleware to authorize the user request
function authorizeUser(req, res, next) {

    // get authorization header (Bearer <token>)
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/authorize/login');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).send({ loggedIn: false, msg: 'Invalid or expired token' });
        }
        req.id = payload.id;   // depends on how you signed it
        req.role = payload.role; // if you included role in token
        next();
    });
}

module.exports = authorizeUser;