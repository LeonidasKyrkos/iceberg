const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../.env.js");

const checkToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }

    if (!token) {
        res.json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
};

module.exports = {
    checkToken
};
