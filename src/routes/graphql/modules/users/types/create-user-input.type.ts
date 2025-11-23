import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";

export const CreateUserInputType = new GraphQLInputObjectType({
  name: "CreateUserInput",
  description: "Creates a new user",
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  }
})