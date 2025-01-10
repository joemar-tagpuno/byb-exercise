import https from 'node:https'
import { AssetManagerErrors, type DownloadableFileLoader } from '@byb/asset-manager-core'
import { injectable } from 'inversify'

@injectable()
export class DownloadableFileLoaderGateway implements DownloadableFileLoader {
  async load(url: string, provider: string): Promise<Buffer> {
    try {
      switch (provider) {
        case 's3':
          return await this.loadFileFromS3bucket(url)
        default:
          return await this.loadFileFromHttpProvider(url)
      }
    } catch (error) {
      throw new AssetManagerErrors.FileDownload.FileDownloadFailed(
        // @ts-ignore
        `Failed to load file ${url} from "${provider}" provider with error ${error?.message}`,
      )
    }
  }

  /**
   * TODO: this implementation can be abstracted into a dedicated HttpFileLoaderGateway class
   *       that supports authentication or API authentication from any in-house
   *       or any third party file provider services.
   */
  private loadFileFromHttpProvider(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          const chunks: Buffer[] = []

          res.on('data', (chunk) => {
            chunks.push(chunk)
          })

          res.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks)
              resolve(buffer)
            } catch (error) {
              reject(error)
            }
          })

          res.on('error', (error) => {
            reject(error)
          })
        })
        .on('error', reject)
    })
  }

  /**
   * TODO: this implementation can be abstracted into a dedicated S3 bucket FileLoader gateway class
   *       using the AWS S3 SDK with proper IAM authentication credentials.
   */
  private async loadFileFromS3bucket(url: string): Promise<Buffer> {
    return await this.loadFileFromHttpProvider(url)
  }
}
