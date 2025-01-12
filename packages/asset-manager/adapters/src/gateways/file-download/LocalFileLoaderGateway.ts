import fs from 'node:fs'
import path from 'node:path'
import { AssetManagerErrors, type DownloadableFileLoader } from '@byb/asset-manager-core'
import { injectable } from 'inversify'

@injectable()
export class LocalFileLoaderGateway implements DownloadableFileLoader {
  async load(url: string, provider: string): Promise<Buffer> {
    try {
      return fs.readFileSync(path.resolve(__dirname, './assets/test-pdf-file.pdf'))
    } catch (error) {
      throw new AssetManagerErrors.FileDownload.FileDownloadFailed(
        // @ts-ignore
        `Failed to load file ${url} from "${provider}" provider with error ${error?.message}`,
      )
    }
  }
}
