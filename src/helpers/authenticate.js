const qs = require('querystring')
const axios = require('axios')

const authenticate = async ({ clientId, clientPassword }) => {
  try {
    const url = 'https://account.demandware.com/dw/oauth2/access_token'
    const data = { grant_type: 'client_credentials' }
    const auth = { username: clientId, password: clientPassword }
    const response = await axios.post(url, qs.stringify(data), { auth })
    return response.data.access_token
  } catch (e) {
    return Promise.reject(new Error(e))
  }
}

export default authenticate
