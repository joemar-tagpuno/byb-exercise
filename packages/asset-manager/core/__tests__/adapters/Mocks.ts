import type { StubbedType } from '@byb/testing'
import { vi } from 'vitest'
import type { DownloadableFileRepository } from '../../src'
import type { DownloadableFileLoader } from '../../src'

export const fakeDownloadableFileRepository: StubbedType<DownloadableFileRepository> = {
  findById: vi.fn(),
}

export const fakeDownloadableFileLoader: StubbedType<DownloadableFileLoader> = {
  load: vi.fn(),
}
