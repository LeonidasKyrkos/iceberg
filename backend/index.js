"use strict";

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const typeDefs = require("./type_definitions.js");
const resolvers = require("./resolvers.js");
const middleware = require("./middleware");
const HandlerGenerator = require("./modules/handlers.js");

const init = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const handlers = new HandlerGenerator();

    const app = express();

    server.applyMiddleware({ app });

    app.use(
        bodyParser.urlencoded({
            // Middleware
            extended: true
        })
    );

    app.use(bodyParser.json());

    app.post("/login", handlers.login);

    app.get("/", middleware.checkToken, handlers.index);

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
