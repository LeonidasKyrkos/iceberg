const { query } = require("../../database.js");

module.exports = ({ ids } = {}) => {
    if (typeof ids === "number") {
        return query(`SELECT * FROM nodes WHERE id=${ids};`);
    }

    if (Array.isArray(ids) && ids.length) {
        return query(`SELECT * FROM nodes WHERE id IN (${ids.join(", ")});`);
    }

    return query(`SELECT * FROM nodes;`);
};
