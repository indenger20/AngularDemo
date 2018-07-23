const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization.split(' ');
        const token = header[1];
        const decoded = jwt.verify(token, config.app.secretkey);
        req.userDate = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Auth failed'
        });
    }
}