import { get } from 'lodash'

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
