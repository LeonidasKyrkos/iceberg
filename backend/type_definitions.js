const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        email: String
        id: Int
    }

    type UserInput {
        email: String
        password: String
    }

    type Node {
        id: Int
        parent_node: Int
        type: Int
        title: String
        short_title: String
    }

    input NodeInput {
        id: Int
        type: Int
        title: String
        short_title: String
    }

    type Type {
        id: Int
        name: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        nodes(ids: [Int]): [Node]
        siblings(id: Int!): [Node]
        types: [Type]
        NODE_TREE: String
        isAncestor(node: Int, child: Int): Boolean
    }

    type Mutation {
        CREATE_NODE(parent_node: Int!, type: Int): Node
        UPDATE_NODE(payload: NodeInput): Node
        MOVE_NODE(nodeId: Int!, newParentId: Int!): Node
        CREATE_USER(email: String!, password: String!): User
    }
`;

module.exports = typeDefs;
