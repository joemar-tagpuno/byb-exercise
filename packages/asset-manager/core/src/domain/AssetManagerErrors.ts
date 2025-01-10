import { DomainError } from '@byb/core'

export namespace AssetManagerErrors {
  export namespace FileDownload {
    export class DownloadableFileModelNotFound extends DomainError {
      constructor() {
        super('DOWNLOADABLE_FILE_MODEL_NOT_FOUND')
      }
    }

    export class FileDownloadFailed extends DomainError {
      constructor(readonly message: string) {
        super(`FILE_DOWNLOAD_FAILED: ${message}`)
      }
    }
  }
}
