import type { DownloadableFile } from './DownloadableFile'

export interface DownloadableFileRepository {
  findById(fileId: string): Promise<DownloadableFile>
}
