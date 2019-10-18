const { GET_NODES, GET_SIBLINGS, CREATE_NODE } = require("./cms/api.js");
const { CREATE_USER, UPDATE_USER, DELETE_USER } = require("./user_db/api.js");

module.exports = {
    Query: {
        async nodes(ids = []) {
            try {
                return await GET_NODES({ ids });
            } catch (err) {
                throw Error(err);
            }
        },
        async siblings(parent, args, context, info) {
            try {
                return await GET_SIBLINGS({ id: args.id });
            } catch (err) {
                throw Error(err);
            }
        }
    },
    Mutation: {
        async CREATE_NODE(parent, args, context, info) {
            try {
                return await CREATE_NODE({
                    parent_node: args.parent_node,
                    type: args.type
                });
            } catch (err) {
                throw Error(err);
            }
        },
        async CREATE_USER({ email, password }) {
            try {
                return await CREATE_USER({ email, password });
            } catch (err) {
                throw Error(err);
            }
        }
    }
};
