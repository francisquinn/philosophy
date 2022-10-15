const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key.pub');

const authenticateToken = (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.slice(6);
        jwt.verify(token, privateKey, { algorithm: 'RS256' }, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('token expired');
                }
                return res.status(200).send({ error: 'invalid token' });
            }
            res.locals.user = user;
            next();
        });
    } else {
        return res.status(200).send({ error: 'no token' });
    }
};

module.exports = {
    authenticateToken
};