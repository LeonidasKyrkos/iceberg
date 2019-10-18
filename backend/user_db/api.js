const { database } = require("../../.env.js");
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

const CREATE_USER = async ({ email, password }) => {
    if (email && password) {
        const hash = await bcrypt.hash(password, 10);
        const escapedEmail = connection.escape(email);
        const escapedHash = connection.escape(hash);

        try {
            await query(
                `INSERT INTO users (email, password) VALUES (${escapedEmail}, ${escapedHash});`
            );
        } catch (err) {
            throw Error(err);
        }
    }
};

// const UPDATE_USER = async ({ id, payload }) => {
// };

module.exports = {
    CREATE_USER
};
