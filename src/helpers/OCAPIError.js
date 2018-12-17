import get from 'lodash/get'

class OCAPIError extends Error {
  constructor (meta) {
    super()

    this.name = this.constructor.name
    this.type = get(meta, 'data.fault.type')
    this.message = get(meta, 'data.fault.message')

    Error.captureStackTrace(this, this.constructor)
  }
}

export default OCAPIError
