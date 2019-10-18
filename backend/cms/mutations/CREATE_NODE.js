const { query } = require("../../database.js");
const GET_CHILDREN = require("../actions/GET_CHILDREN.js");
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

module.exports = async ({ parent_node, type }) => {
    if (typeof parent_node === "undefined" || parent_node <= 0) {
        throw Error(
            `Invalid parent node "${parent_node}" provided. Please provide a parent node of ID 1 or greater.`
        );
    }

    const children = await GET_CHILDREN({ parent_node });

    const cols = [
        { name: "parent_node", value: parent_node },
        { name: "sort", value: children.length }
    ];

    if (type) {
        cols.push({ name: "type", value: type });
    }

    const colNames = cols.map(col => col.name).join(", ");
    const colValues = cols.map(col => col.value).join(", ");

    const { insertId } = await query(
        `INSERT INTO nodes (${colNames}) VALUES (${colValues})`
    );

    const nodeArr = await GET_NODES({ ids: insertId });
    const node = nodeArr[0];

    await recursivelyUpdateTree(node.id, node.parent_node);

    return node;
};
