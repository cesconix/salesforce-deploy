import path from 'path'

const mkdir = async (dir, axios) => {
  try {
    const res = await axios({
      method: 'mkcol',
      url: path.join('/', dir),
      validateStatus: status => status < 500
    })
    return res.status === 201
  } catch (e) {
    throw new Error(e)
  }
}

export default mkdir
