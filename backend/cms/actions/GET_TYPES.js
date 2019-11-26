const { query } = require("../../database.js");

module.exports = async () => {
    const types = await query(`SELECT * FROM node_types;`);

    return types.filter(type => type.id > 0);
};
