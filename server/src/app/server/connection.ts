import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import build from "../schema/build";

export default async (emitSchema: boolean = false, PORT: string) => {
  void createConnection();

  const app = express();
  const server = new ApolloServer({
    schema: await build(emitSchema),
  });

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};
