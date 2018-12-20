import path from 'path'
import axios from 'axios'

const mkdir = async (dir, options) => {
  try {
    const url = path.join('/', dir)
    const method = 'mkcol'
    const validateStatus = status => status === 201
    const response = await axios({ ...options, url, method, validateStatus })
    return response.status === 201
  } catch (e) {
    return Promise.reject(e)
  }
}

export default mkdir
