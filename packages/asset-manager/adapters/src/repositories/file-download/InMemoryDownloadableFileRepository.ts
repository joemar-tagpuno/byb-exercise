import { AssetManagerErrors, type DownloadableFile, type DownloadableFileRepository } from '@byb/asset-manager-core'
import { injectable } from 'inversify'
import { QueryTypes, type Sequelize } from 'sequelize'

@injectable()
export class InMemoryDownloadableFileRepository implements DownloadableFileRepository {
  private files = [
    {
      id: '44a22e81-0ff7-471a-90be-0b49895cd1ca',
      name: 'file-1.pdf',
      url: 'http://localhost:3000/downloadable-files/44a22e81-0ff7-471a-90be-0b49895cd1ca',
      size: 140,
      type: 'pdf',
      provider: 'http',
    },
    {
      id: 'd04729db-62a0-4c39-b05f-ae25ee0c076f',
      name: 'file-2.pdf',
      url: 'http://localhost:3000/downloadable-files/d04729db-62a0-4c39-b05f-ae25ee0c076f',
      size: 128,
      type: 'pdf',
      provider: 'http',
    },
    {
      id: '0af3b987-5a58-4661-b330-c2a88c089ebe',
      name: 'file-3.pdf',
      url: 'http://localhost:3000/downloadable-files/0af3b987-5a58-4661-b330-c2a88c089ebe',
      size: 111,
      type: 'pdf',
      provider: 'http',
    },
  ]

  async findById(fileId: string): Promise<DownloadableFile> {
    const file = this.files.find((file) => file.id === fileId)

    if (!file) {
      throw new AssetManagerErrors.FileDownload.DownloadableFileModelNotFound()
    }

    return {
      name: file.name,
      url: file.url,
      size: file.size,
      type: file.type,
      provider: file.provider,
    }
  }
}
