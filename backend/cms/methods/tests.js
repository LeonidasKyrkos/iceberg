const { query } = require("../../database.js");
const GET_NODES = require("../actions/GET_NODES.js");

module.exports = {
    nodeExists: async ({ nodeId }) => {
        const arr = await GET_NODES({ ids: nodeId });

        return Boolean(arr.length);
    },
    isDescendant: async ({ node, parent }) => {
        const arr = await query(
            `SELECT * FROM node_tree WHERE parent=${node} AND child=${parent}`
        );

        return Boolean(arr.length);
    },
    isAncestor: async ({ node, child }) => {
        const arr = await query(
            `SELECT * FROM node_tree WHERE parent=${node} AND child=${child}`
        );

        return Boolean(arr.length);
    },
};
