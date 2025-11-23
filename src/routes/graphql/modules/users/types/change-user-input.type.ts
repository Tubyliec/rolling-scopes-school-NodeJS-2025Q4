import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: "ChangeUserInput",
  description: "Change a existing user",
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  }
})