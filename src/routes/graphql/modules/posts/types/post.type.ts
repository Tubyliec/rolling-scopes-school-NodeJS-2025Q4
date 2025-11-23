import {  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../../../types/uuid.js";


export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: "This type represent a Post",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  })
});