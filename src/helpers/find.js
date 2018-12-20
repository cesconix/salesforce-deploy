import path from 'path'
import axios from 'axios'

const find = async (dir, options) => {
  try {
    const url = path.join('/', dir)
    const method = 'propfind'
    const validateStatus = status => status === 207 || status === 404
    const response = await axios({ ...options, url, method, validateStatus })
    return response.status === 207
  } catch (e) {
    return Promise.reject(e)
  }
}

export default find
