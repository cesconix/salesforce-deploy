import path from 'path'

const rm = async (file, axios) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: path.join('/', file),
      validateStatus: status => status < 500
    })
    return res.status === 204
  } catch (e) {
    throw new Error(e)
  }
}

export default rm
