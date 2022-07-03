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
                return res.status(403).send({ message: 'invalid token' });
            }
            res.locals.user = user.id;
            next();
        });
    } else {
        return res.status(401).send({ message: 'no token' });
    }
};

module.exports = {
    authenticateToken
};