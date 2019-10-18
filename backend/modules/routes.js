const bcrypt = require("bcrypt");
const { getUserByEmail, createNewUser } = require("../database");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../.env.js");
const { checkToken } = require("../middleware");

const routes = [
    {
        path: "/",
        method: "get",
        middleware: checkToken,
        handler(req, res) {
            res.json({
                success: true,
                message: "Index page"
            });
        }
    },
    {
        path: "/login",
        method: "post",
        middleware: null,
        async handler(req, res) {
            const { email, password } = req.body;

            if (email && password) {
                const user = await getUserByEmail(email);
                const matchingEmails = email === user.email;
                const matchingPasswords = await bcrypt.compare(
                    password,
                    user.password
                );

                if (matchingEmails && matchingPasswords) {
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
    }
];

const setupRoutes = app => {
    routes.forEach(route => {
        if (route.middleware) {
            app[route.method](route.path, route.middleware, route.handler);
        } else {
            app[route.method](route.path, route.handler);
        }
    });
};

module.exports = setupRoutes;
