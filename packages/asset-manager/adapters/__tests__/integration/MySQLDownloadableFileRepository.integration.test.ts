import { AssetManagerErrors } from '@byb/asset-manager-core'
import { QueryTypes, Sequelize } from 'sequelize'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MySQLDownloadableFileRepository } from '../../src'

describe('MySQLDownloadableFileRepository', () => {
  let underTest: MySQLDownloadableFileRepository
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize('sqlite::memory:')
    await sequelize.query(
      `
        CREATE TABLE downloadable_files (
            id TEXT PRIMARY KEY,
            name TEXT,
            url TEXT,
            size INTEGER,
            type TEXT,
            provider TEXT
        )`,
      {
        type: QueryTypes.RAW,
      },
    )

    underTest = new MySQLDownloadableFileRepository(sequelize)
  })

  afterEach(async () => {
    await sequelize.query('DROP TABLE IF EXISTS downloadable_files')
    await sequelize.close()
  })

  describe('Everything is ok', () => {
    it('should return a file object', async () => {
      // GIVEN
      await sequelize.query(
        'INSERT INTO downloadable_files (id, name, url, size, type, provider) VALUES (?, ?, ?, ?, ?, ?)',
        {
          replacements: ['file-id', 'file-name.pdf', 'http://localhost:123456/file/file-id', 124, 'pdf', 'http'],
          type: QueryTypes.INSERT,
        },
      )

      // WHEN
      const result = await underTest.findById('file-id')

      // THEN
      expect(result).toEqual({
        name: 'file-name.pdf',
        url: 'http://localhost:123456/file/file-id',
        size: 124,
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
