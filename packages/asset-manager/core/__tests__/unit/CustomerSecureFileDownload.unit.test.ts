import type { StubbedType } from '@byb/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  AssetManagerErrors,
  CustomerSecureFileDownload,
  type DownloadableFileLoader,
  type DownloadableFileRepository,
} from '../../src'
import { fakeDownloadableFileLoader, fakeDownloadableFileRepository } from '../adapters/Mocks'

describe('CustomerSecureFileDownload', () => {
  let downloadableFileRepository: StubbedType<DownloadableFileRepository>
  let downloadableFileLoader: StubbedType<DownloadableFileLoader>
  let useCase: CustomerSecureFileDownload

  beforeEach(() => {
    downloadableFileRepository = fakeDownloadableFileRepository
    downloadableFileLoader = fakeDownloadableFileLoader
    useCase = new CustomerSecureFileDownload(downloadableFileRepository, downloadableFileLoader)
  })

  describe('Everything is ok', () => {
    it('can guard the secure download use-case', async () => {
      // GIVEN
      const identity = {
        id: 'unknown-id',
        userType: 'unknown',
        userRole: 'unknown',
        email: 'email@fake.com',
        phone: '0912345678',
      }
      const request = {
        userId: 'user-id',
        fileId: 'file-id',
      }

      // WHEN
      const result = await useCase.canExecute(identity, request)

      // THEN
      expect(result).toBeFalsy()
      expect(result).toMatchSnapshot()
    })

    it('can execute the secure download use-case', async () => {
      // GIVEN
      downloadableFileRepository.findById.mockResolvedValue({
        name: 'file-name.pdf',
        url: 'http://localhost:123456/file-url',
        size: 124,
        type: 'pdf',
        provider: 'http',
      })

      downloadableFileLoader.load.mockResolvedValue(Buffer.from('file-content-base64'))

      const input = {
        userId: 'user-id',
        fileId: 'file-id',
      }

      // WHEN
      const result = await useCase.execute(input)

      // THEN
      expect(result).toEqual({
        file: Buffer.from('file-content-base64').toString('base64'),
        filename: 'file-name.pdf',
        filesize: 124,
        filetype: 'pdf',
      })
      expect(result).toMatchSnapshot()
    })
  })

  // Can fail when
  it('can throw a domain error if the file cannot be found', async () => {
    // GIVEN
    downloadableFileRepository.findById.mockRejectedValueOnce(
      new AssetManagerErrors.FileDownload.DownloadableFileModelNotFound(),
    )
    const input = {
      userId: 'user-id',
      fileId: 'file-id',
    }

    // WHEN
    const result = useCase.execute(input)

    // THEN
    await expect(result).rejects.toThrow(AssetManagerErrors.FileDownload.DownloadableFileModelNotFound)
  })
})
