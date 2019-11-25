const { query } = require("../../database.js");

/**
 * Returns the direct descendants of the provided node
 */
module.exports = ({ parentNode }) => {
    if (typeof parentNode !== "number") {
        throw Error(
            `Invalid parent node provided of type ${typeof parentNode}`
        );
    }

    return query(
        `SELECT * FROM nodes WHERE parent_node=${parentNode} ORDER BY sort;`
    );
};
