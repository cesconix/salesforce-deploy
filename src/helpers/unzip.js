import path from 'path'
import qs from 'querystring'

const unzip = async (file, axios) => {
  try {
    const res = await axios({
      url: path.join('/', file),
      method: 'POST',
      data: qs.stringify({ method: 'UNZIP' }),
      validateStatus: status => status < 500
    })
    return res.status === 204
  } catch (e) {
    throw new Error(e)
  }
}

export default unzip
