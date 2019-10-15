const { getUserByEmail } = require("../database");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../.env.js");

class HandlerGenerator {
    async login(req, res) {
        const { email, password } = req.body;

        if (email && password) {
            const user = await getUserByEmail(email);

            if (user.email === email && user.password === password) {
                let token = jwt.sign({ email }, jwt_secret, {
                    expiresIn: "24h" // expires in 24 hours
                });
                // return the JWT token for the future API calls
                return res.json({
                    success: true,
                    message: "Authentication successful!",
                    token: token
                });
            } else {
                return res.json({
                    success: false,
                    message: "Incorrect username or password"
                });
            }
        }

        return res.json({
            success: false,
            message: "Authentication failed! Please check the request"
        });
    }
    index(req, res) {
        res.json({
            success: true,
            message: "Index page"
        });
    }
}

module.exports = HandlerGenerator;
