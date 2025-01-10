import { gql } from 'graphql-tag'

export const AssetManagerTypeDefs = gql`
    type DownloadableFile {
        file: String
        filename: String
        filetype: String
        filezise: Int
    }
    
    extend type Query {
        customerSecureFileDownload(fileId: GUID!, userId: GUID!): DownloadableFile
        unauthorizedCustomerSecureFileDownload(fileId: GUID!, userId: GUID!): DownloadableFile
    }
`
