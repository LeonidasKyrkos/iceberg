const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../.env.js");

const checkToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token && token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            const decoded_token = await new Promise((resolve, reject) => {
                jwt.verify(token, jwt_secret, (err, decoded) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(decoded);
                });
            });

            req.decoded = decoded_token;
            next();
            return;
        } catch (err) {
            return res.json({
                success: false,
                message: "Token is not valid"
            });
        }
    }

    return res.json({
        success: false,
        message: "Auth token is not supplied"
    });
};

module.exports = {
    checkToken
};
