import fs from 'fs'
import path from 'path'

const upload = async (src, dest, axios) => {
  try {
    const file = path.join('/', dest, path.basename(src))
    const stream = fs.createReadStream(src)

    const res = await axios({
      url: file,
      method: 'put',
      data: stream,
      validateStatus: status => status < 500
    })

    return res.status === 201 ? file : false
  } catch (e) {
    throw new Error(e)
  }
}

export default upload
