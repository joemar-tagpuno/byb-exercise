import type { DownloadableFileProvider } from './DownloadableFile'

export interface DownloadableFileLoader {
  load(url: string, provider: DownloadableFileProvider): Promise<Buffer>
}
