import { AssetManagerErrors, type DownloadableFile, type DownloadableFileRepository } from '@byb/asset-manager-core'
import { injectable } from 'inversify'
import { QueryTypes, type Sequelize } from 'sequelize'

@injectable()
export class InMemoryDownloadableFileRepository implements DownloadableFileRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async findById(fileId: string): Promise<DownloadableFile> {
    const [file] = await this.sequelize.query<DownloadableFile>(
      'select name, url, size, type, provider from downloadable_files where id = $fileId limit 1',
      {
        type: QueryTypes.SELECT,
        bind: { fileId },
      },
    )

    if (!file) {
      throw new AssetManagerErrors.FileDownload.DownloadableFileModelNotFound()
    }
    return file
  }
}
