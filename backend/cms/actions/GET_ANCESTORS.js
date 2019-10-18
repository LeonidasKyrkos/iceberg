const { query } = require("../../database.js");

module.exports = ({ nodeId }) => {
    return query(
        `SELECT nodes.* from nodes INNER JOIN node_tree ON nodes.id=node_tree.parent AND node_tree.child=${nodeId}`
    );
};
