import axios from 'axios'
import get from 'lodash/get'
import authenticate from './helpers/authenticate'
import OCAPIError from './helpers/OCAPIError'

const versions = async ({ clientId, clientPassword, hostname, apiVersion }) => {
  try {
    const token = await authenticate({ clientId, clientPassword })

    const reqUrl = `https://${hostname}/s/-/dw/data/${apiVersion}/code_versions`
    const reqHeaders = { Authorization: `Bearer ${token}` }

    const res = await axios.get(reqUrl, { headers: reqHeaders })

    return get(res, 'data.data', [])
  } catch (e) {
    return Promise.reject(new OCAPIError(e.response))
  }
}

export default versions
