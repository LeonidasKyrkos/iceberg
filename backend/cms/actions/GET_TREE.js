const { query } = require("../../database.js");
const GET_NODES = require("./GET_NODES.js");

const getChildren = nodes => {
    return leaf => {
        leaf.children = nodes.filter(node => node.parent_node === leaf.id);
        leaf.children.forEach(getChildren(nodes));
    };
};

module.exports = async () => {
    const nodes = await GET_NODES();
    const tallHandsomeTree = [nodes[0]];

    tallHandsomeTree.forEach(getChildren(nodes));

    return JSON.stringify(tallHandsomeTree);
};
