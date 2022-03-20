const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key.pub');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send({ message: 'no token' });
    }

    jwt.verify(token, privateKey, { algorithm: 'RS256' }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).send({ message: 'invalid token' });
        }
        res.locals.user = user.id;
        next();
    });

};

module.exports = {
    authenticateToken
};