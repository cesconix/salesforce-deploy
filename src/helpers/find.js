import path from 'path'

const find = async (dir, axios) => {
  try {
    const res = await axios({
      method: 'PROPFIND',
      url: path.join('/', dir),
      validateStatus: status => status === 207 || status === 404
    })
    return res.status === 207
  } catch (e) {
    throw new Error(e)
  }
}

export default find
