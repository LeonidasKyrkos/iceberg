const {
    GET_NODES,
    GET_SIBLINGS,
    GET_TREE,
    IS_ANCESTOR,
    CREATE_NODE,
    UPDATE_NODE,
    MOVE_NODE,
} = require("./cms/api.js");
const { CREATE_USER, UPDATE_USER, DELETE_USER } = require("./user_db/api.js");

const { ApolloError } = require("apollo-server-express");

module.exports = {
    Query: {
        async nodes(parent, args, context, info) {
            try {
                return await GET_NODES({ ids: args.ids });
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
        },
        async NODE_TREE() {
            try {
                return await GET_TREE();
            } catch (err) {
                throw Error(err);
            }
        },
        async isAncestor(parent, args, context, info) {
            try {
                return await IS_ANCESTOR({
                    node: args.node,
                    child: args.child,
                });
            } catch (err) {
                throw Error(err);
            }
        },
    },
    Mutation: {
        async CREATE_NODE(parent, args, context, info) {
            try {
                return await CREATE_NODE({
                    parentNode: args.parent_node,
                    type: args.type,
                });
            } catch (err) {
                throw Error(err);
            }
        },
        async UPDATE_NODE(parent, args, context, info) {
            try {
                return await UPDATE_NODE({
                    payload: args.payload,
                });
            } catch (err) {
                throw Error(err);
            }
        },
        async MOVE_NODE(parent, args, context, info) {
            try {
                return await MOVE_NODE({
                    nodeId: args.nodeId,
                    newParentId: args.newParentId,
                });
            } catch (err) {
                throw new ApolloError(err);
            }
        },
        async CREATE_USER({ email, password }) {
            try {
                return await CREATE_USER({ email, password });
            } catch (err) {
                throw Error(err);
            }
        },
    },
};
