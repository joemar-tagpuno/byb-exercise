export const FileTypes = {
  Image: 'image',
  Video: 'video',
  Audio: 'audio',
  Document: 'document',
  Archive: 'archive',
  Text: 'text',
  Pdf: 'pdf',
}

// uses union types over enums
export type FileType = (typeof FileTypes)[keyof typeof FileTypes]

export const DownloadableFileProviders = {
  S3: 's3',
  http: 'http',
}

// uses union types over enums
export type DownloadableFileProvider = (typeof DownloadableFileProviders)[keyof typeof DownloadableFileProviders]

export interface DownloadableFile {
  url: string
  name: string
  size: number
  type: FileType
  provider: DownloadableFileProvider
}
