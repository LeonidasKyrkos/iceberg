const { query } = require("../../database.js");
const recursivelyUpdateTree = require("../methods/recursivelyUpdateTree.js");
const GET_CHILDREN = require("../actions/GET_CHILDREN.js");
const GET_NODES = require("../actions/GET_NODES.js");

const { nodeExists, isDescendant } = require("../methods/tests.js");

module.exports = async ({ nodeId, newParentId }) => {
    if (!(await nodeExists({ nodeId }))) {
        throw "Invalid node ID";
    }

    if (await isDescendant({ node: nodeId, parent: newParentId })) {
        throw "You may not move a node into one of its descendants";
    }

    return;

    const newSiblings = await GET_CHILDREN({ parentNode: newParentId });
    const siblingSorts = newSiblings.map(sibling => sibling.sort);
    const newSort = Math.max(...siblingSorts) + 1;

    await query(`DELETE FROM node_tree WHERE child=${nodeId}`);
    await query(
        `UPDATE nodes SET parent_node=${newParentId} WHERE id=${nodeId}`
    );
    await query(`UPDATE nodes SET sort=${newSort} WHERE id=${nodeId}`);
    await recursivelyUpdateTree(nodeId, newParentId);

    const nodeArr = await GET_NODES({ ids: nodeId });

    return nodeArr[0];
};
