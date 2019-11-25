const { query } = require("../../database.js");
const GET_NODES = require("../actions/GET_NODES.js");

// Recursively update node tree by working our way up via each node's parent
// This seems terrible but I'm rubbish at SQL
const recursivelyUpdateTree = async (nodeId, parentNodeId, depth = 1) => {
    await query(
        `INSERT INTO node_tree (parent, child, depth) VALUES (${parentNodeId}, ${nodeId}, ${depth})`
    );

    if (parentNodeId > 1) {
        const parentNode = await GET_NODES({ ids: parentNodeId });

        return await recursivelyUpdateTree(
            nodeId,
            parentNode[0].parent_node,
            depth + 1
        );
    }
};

module.exports = recursivelyUpdateTree;
