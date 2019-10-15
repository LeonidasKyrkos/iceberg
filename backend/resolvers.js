const { query } = require("./database.js");

module.exports = {
    Query: {
        async users() {
            return await query("SELECT id, email FROM users");
        }
    }
};
