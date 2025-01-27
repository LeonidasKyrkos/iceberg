import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {},
    defaultOptions: {
        query: {
            fetchPolicy: "cache-first",
            errorPolicy: "all",
        },
    },
});
