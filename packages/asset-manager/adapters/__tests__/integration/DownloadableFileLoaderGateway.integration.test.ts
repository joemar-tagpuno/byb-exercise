import fs from 'node:fs'
import path from 'node:path'
import { AssetManagerErrors } from '@byb/asset-manager-core'
import nock from 'nock'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DownloadableFileLoaderGateway } from '../../src'

describe('DownloadableFileGateway', () => {
  let underTest: DownloadableFileLoaderGateway

  beforeEach(() => {
    underTest = new DownloadableFileLoaderGateway()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('Everything is ok', () => {
    it('should return a downloaded file', async () => {
      // GIVEN
      const readTestPdfFile = () => fs.readFileSync(path.resolve(__dirname, './assets/test-pdf-file.pdf'))
      const fileLoaderInterceptor = nock('https://www.beforeyoubuy.com.au')
        .get('/secure-downloads/test-file-id')
        // @ts-ignore
        .reply(200, readTestPdfFile(), {
          'Content-Type': 'application/pdf',
          'Content-Length': readTestPdfFile().length,
          'Content-Disposition': 'attachment; filename=test-pdf-file.pdf',
        })

      // WHEN
      const result = await underTest.load('https://www.beforeyoubuy.com.au/secure-downloads/test-file-id', 'http')

      // THEN
      expect(Buffer.compare(readTestPdfFile(), result) === 0).toBeTruthy()
      expect(result).toMatchSnapshot()
      fileLoaderInterceptor.done()
    })

    it('should throw an error if the file cannot be downloaded', async () => {
      // GIVEN
      const provider = 'http'
      const url = 'https://www.beforeyoubuy.com.au/secure-downloads/test-file-id'
      const fileLoaderInterceptor = nock('https://www.beforeyoubuy.com.au')
        .get('/secure-downloads/test-file-id')
        .replyWithError({
          message: `The requested resource ${url} could not be found.`,
          code: 'RESOURCE_NOTFOUND_ERROR',
        })

      // WHEN
      const result = underTest.load(url, provider)

      // THEN
      await expect(result).rejects.toThrowError(AssetManagerErrors.FileDownload.FileDownloadFailed)
      fileLoaderInterceptor.done()
    })

    it('should throw an error if the file provider respond an error', async () => {
      // GIVEN
      nock.disableNetConnect()
      const provider = 'http'
      const url = 'https://www.beforeyoubuy.com.au/secure-downloads/test-file-id'

      // WHEN
      const result = underTest.load(url, provider)

      // THEN
      await expect(result).rejects.toThrowError(AssetManagerErrors.FileDownload.FileDownloadFailed)
    })
  })
})
