const qs = require('querystring')
const axios = require('axios')

const authenticate = async ({ clientId, clientPassword }) => {
  try {
    const reqUrl = 'https://account.demandware.com/dw/oauth2/access_token'
    const reqData = { grant_type: 'client_credentials' }
    const reqAuth = { username: clientId, password: clientPassword }
    const { data } = await axios.post(reqUrl, qs.stringify(reqData), { auth: reqAuth })
    return data.access_token
  } catch (e) {
    return Promise.reject(new Error(e))
  }
}

export default authenticate
