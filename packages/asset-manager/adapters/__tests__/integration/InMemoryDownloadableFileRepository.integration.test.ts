import { AssetManagerErrors } from '@byb/asset-manager-core'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDownloadableFileRepository } from '../../src'

describe('InMemoryDownloadableFileRepository', () => {
  let underTest: InMemoryDownloadableFileRepository

  beforeEach(() => {
    underTest = new InMemoryDownloadableFileRepository()
  })

  describe('Everything is ok', () => {
    it('should return a file object', async () => {
      // WHEN
      const result = await underTest.findById('44a22e81-0ff7-471a-90be-0b49895cd1ca')

      // THEN
      expect(result).toEqual({
        name: 'file-1.pdf',
        url: 'http://localhost:3000/downloadable-files/44a22e81-0ff7-471a-90be-0b49895cd1ca',
        size: 140,
        type: 'pdf',
        provider: 'http',
      })
      expect(result).toMatchSnapshot()
    })

    it('should throw a model not found error result if record cannot be found', async () => {
      // WHEN
      const result = underTest.findById('unknown-file-id')

      // THEN
      await expect(result).rejects.toThrowError(AssetManagerErrors.FileDownload.DownloadableFileModelNotFound)
    })
  })
})
