import { GraphQLServer } from "graphql-yoga"
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/graphql/schema.graphql",
  resolvers,
});

server.start(() => console.log(`http://localhost:4000에서 서버 가동중`));
