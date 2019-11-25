"use strict";

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const typeDefs = require("./type_definitions.js");
const resolvers = require("./resolvers.js");
const setupRoutes = require("./modules/routes.js");

const init = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        engine: { debugPrintReports: true },
    });

    const app = express();

    server.applyMiddleware({ app });

    app.use(
        bodyParser.urlencoded({
            // Middleware
            extended: true,
        })
    );

    app.use(bodyParser.json());

    app.use(express.static("frontend/dist"));

    setupRoutes(app);

    app.listen({ port: 4000 }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();
