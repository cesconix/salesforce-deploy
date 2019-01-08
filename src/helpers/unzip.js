import path from 'path'
import qs from 'querystring'

const unzip = (file, axios) => {
  return axios({
    url: path.join('/', file),
    method: 'post',
    data: qs.stringify({ method: 'UNZIP' })
  })
}

export default unzip
