import { prisma } from "./generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.start(() => console.log(`http://localhost:4000에서 서버 가동중`));
