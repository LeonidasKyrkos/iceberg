const { database } = require("../.env.js");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: database.user,
    password: database.password,
    database: database.name
});

const query = query => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        });
    });
};

const getUserByEmail = async email => {
    return (await query(
        `SELECT email, password from users where email=${connection.escape(
            email
        )}`
    ))[0];
};

module.exports = {
    getUserByEmail,
    query
};
