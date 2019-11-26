const { query } = require("../../database.js");
const GET_NODES = require("../actions/GET_NODES.js");

module.exports = async ({ payload }) => {
    const cols = Object.keys(payload)
        .filter(
            item => item !== "parent_node" && item !== "sort" && item !== "id"
        )
        .map(col => {
            if (typeof payload[col] !== "string") {
                return `${col}=${payload[col]}`;
            }

            return `${col}='${payload[col]}'`;
        });

    await query(`UPDATE nodes SET ${cols.join(", ")} WHERE id=${payload.id}`);

    const nodeArr = await GET_NODES({ ids: payload.id });
    const node = nodeArr[0];

    return node;
};
