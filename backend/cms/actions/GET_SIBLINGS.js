const { query } = require("../../database.js");
const GET_NODES = require("./GET_NODES.js");

module.exports = async ({ id }) => {
    if (typeof id !== "number") {
        throw Error(`Invalid ID provided - type = ${typeof id}`);
    }

    const nodes = await GET_NODES({ ids: id });

    if (!nodes.length) {
        return [];
    }

    const node = nodes[0];

    return query(`
        SELECT * FROM nodes WHERE parent_node=${node.parent_node} AND id<>${node.id} ORDER BY sort
    `);
};
