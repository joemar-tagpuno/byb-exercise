import { CustomerSecureFileDownload, type CustomerSecureFileDownloadRequest } from '@byb/asset-manager-core'
import type { UserIdentity } from '@byb/core'
import { GraphQLError } from 'graphql'
import { inject, injectable } from 'inversify'

@injectable()
export class AssetManagerResolvers {
  constructor(
    @inject(CustomerSecureFileDownload)
    private readonly _customerSecureFileDownload: CustomerSecureFileDownload,
  ) {}

  resolvers() {
    return {
      Query: {
        customerSecureFileDownload: async (_, { fileId, userId }, _context) => {
          // const user: UserIdentity = context.user
          const user: UserIdentity = {
            id: '913a6046-9959-4190-bd12-48cc6e8d8563',
            userRole: 'user',
            email: 'me@joemartagpuno.info',
            phone: '1234567890',
          }
          const request: CustomerSecureFileDownloadRequest = { fileId, userId }

          const isAuthorized = await this._customerSecureFileDownload.canExecute(user, request)
          if (!isAuthorized) {
            throw new GraphQLError('Unauthorized')
          }

          return await this._customerSecureFileDownload.execute(request)
        },
        unauthorizedCustomerSecureFileDownload: async (_, { fileId, userId }, _context) => {
          const user: UserIdentity = {
            id: 'unauthorized-user-id',
            userRole: 'unverified_user',
            email: 'unverified_user@email.com',
          }
          const request: CustomerSecureFileDownloadRequest = { fileId, userId }

          const isAuthorized = await this._customerSecureFileDownload.canExecute(user, request)
          if (!isAuthorized) {
            throw new GraphQLError('Unauthorized')
          }

          return await this._customerSecureFileDownload.execute(request)
        },
      },
    }
  }
}
