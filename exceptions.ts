export class UnsupportedEventException extends Error {
  constructor(msg = 'unsupported event') {
    super(msg)
    Error.captureStackTrace(this, UnsupportedEventException)
  }
}
