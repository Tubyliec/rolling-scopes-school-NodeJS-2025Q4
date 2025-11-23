import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { rootQueryType } from './modules/root/root-query.js';
import { rootMutationType } from './modules/root/root-mutation.js';
import { loaders } from './loaders.js';
import depthLimit from 'graphql-depth-limit';

const MAX_DEPTH = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const schema = new GraphQLSchema({
        query: rootQueryType,
        mutation: rootMutationType,
      });

      const source = req.body.query;
      const variableValues = req.body.variables;
      const contextValue = loaders(prisma);

      const validation = validate(schema, parse(source), [depthLimit(MAX_DEPTH)]);

      if (validation.length > 0) {
        return {
          errors: validation,
        };
      }

      return await graphql({
        schema,
        source,
        variableValues,
        contextValue,
      });
    },
  });
};

export default plugin;