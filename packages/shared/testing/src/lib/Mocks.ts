import type { Mock } from 'vitest'

export type StubbedType<T extends object> = {
  [K in keyof T]: Mock
}
