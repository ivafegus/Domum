const jwt = require('jsonwebtoken');

/*
Checks if the token the user sent in the authorization header is valid and was not tampered with.
*/

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json("Token does not exist, please log in.");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token invalid.");
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;