const { query } = require("../../database.js");

module.exports = ({ parent_node }) => {
    if (typeof parent_node !== "number") {
        throw Error(
            `Invalid parent node provided of type ${typeof parent_node}`
        );
    }

    return query(
        `SELECT * FROM nodes WHERE parent_node=${parent_node} ORDER BY sort;`
    );
};
