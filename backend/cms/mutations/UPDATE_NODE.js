const { query } = require("../../database.js");

module.exports = async payload => {
    const cols = Object.keys(payload)
        .map(col => `${col}=${payload[col]}`)
        .filter(
            item => item !== "parent_node" && item !== "sort" && item !== "id"
        );

    console.log(cols, payload.id);

    return;

    await query(`UPDATE nodes SET ${cols.join(", ")} WHERE id=${payload.id}`);

    const nodeArr = await GET_NODES({ ids: payload.id });
    const node = nodeArr[0];

    await recursivelyUpdateTree(node.id, node.parent_node);

    return node;
};
