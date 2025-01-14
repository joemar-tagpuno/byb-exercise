import type { Usecase, UserIdentity } from '@byb/core'
import { inject, injectable } from 'inversify'
import { AssetManagerIdentifiers } from '../AssetManagerIdentifiers'
import type { DownloadableFileLoader } from '../domain/file-download/DownloadableFileLoader'
import type { DownloadableFileRepository } from '../domain/file-download/DownloadableFileRepository'

export interface CustomerSecureFileDownloadRequest {
  userId: string
  fileId: string
}

export interface CustomerSecureFileDownloadOutput {
  file: string
  filename: string
  filesize: number
  filetype: string
}

@injectable()
export class CustomerSecureFileDownload
  implements Usecase<CustomerSecureFileDownloadRequest, CustomerSecureFileDownloadOutput>
{
  constructor(
    @inject(AssetManagerIdentifiers.downloadableFileRepository)
    private readonly _downloadableFileRepository: DownloadableFileRepository,
    @inject(AssetManagerIdentifiers.downloadableFileLoader)
    private readonly _downloadableFileLoader: DownloadableFileLoader,
  ) {}

  async execute(request: CustomerSecureFileDownloadRequest): Promise<CustomerSecureFileDownloadOutput> {
    const downloadableFile = await this._downloadableFileRepository.findById(request.fileId)
    const binaryFile = await this._downloadableFileLoader.load(downloadableFile.url, downloadableFile.provider)

    return {
      file: binaryFile.toString('base64'),
      filename: downloadableFile.name,
      filesize: downloadableFile.size,
      filetype: downloadableFile.type,
    }
  }

  // @ts-ignore
  canExecute(identity: UserIdentity, request: CustomerSecureFileDownloadRequest): boolean {
    return request.userId === identity.id && identity.userRole === 'user'
  }
}
