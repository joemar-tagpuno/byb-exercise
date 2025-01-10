export class DomainError extends Error {
  message: string
  cause?: any
  safeMessage?: string
  code?: string

  constructor(message: string, cause?: any, safeMessage?: string, code?: string) {
    super(message)
    this.name = this.constructor.name
    this.cause = cause
    this.safeMessage = safeMessage
    this.message = message
    this.code = code
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((alt: object, key: string) => {
      // @ts-ignore
      alt[key] = this[key]
      return alt
    }, {})
  }
}
