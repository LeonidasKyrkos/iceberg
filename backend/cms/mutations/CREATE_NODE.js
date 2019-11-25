const { query } = require("../../database.js");
const recursivelyUpdateTree = require("../methods/recursivelyUpdateTree.js");

const GET_CHILDREN = require("../actions/GET_CHILDREN.js");
const GET_NODES = require("../actions/GET_NODES.js");

module.exports = async ({ parentNode, type }) => {
    if (typeof parentNode === "undefined" || parentNode <= 0) {
        throw Error(
            `Invalid parent node "${parentNode}" provided. Please provide a parent node of ID 1 or greater.`
        );
    }

    const children = await GET_CHILDREN({ parentNode });

    const cols = [
        { name: "parent_node", value: parentNode },
        { name: "sort", value: children.length },
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
