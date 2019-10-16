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
    const escapedEmail = connection.escape(email);

    return (await query(
        `SELECT email, password from users where email=${escapedEmail};`
    ))[0];
};

const createNewUser = async ({ email, hash }) => {
    const escapedEmail = connection.escape(email);
    const escapedHash = connection.escape(hash);

    return query(
        `INSERT INTO users (email, password) VALUES (${escapedEmail}, ${escapedHash});`
    );
};

module.exports = {
    createNewUser,
    getUserByEmail,
    query
};
