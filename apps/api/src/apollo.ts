import { ApolloServer, type ApolloServerOptions } from '@apollo/server'
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars'
import type { Container } from 'inversify'

import { merge } from 'lodash'
import { AssetManagerResolvers } from './modules/asset-manager/AssetManagerResolvers'
import { AssetManagerTypeDefs } from './modules/asset-manager/AssetManagerTypeDefs'

export function createApolloServer(kernel: Container) {
  const Query = `
        type ListMetadata {
          count: Int!
        }
        type Query {
          _empty: String
        },
        type Mutation {
          _empty: String
        }
    `

  const resolvers = merge(kernel.get(AssetManagerResolvers).resolvers(), {})

  const apolloServerConfig: ApolloServerOptions<any> = {
    typeDefs: [Query, AssetManagerTypeDefs, ...scalarTypeDefs],
    resolvers: {
      ...scalarResolvers,
      ...resolvers,
    },
    introspection: true, // for development environment only
  }

  return new ApolloServer(apolloServerConfig)
}
