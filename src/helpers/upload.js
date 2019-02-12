import fs from 'fs'
import path from 'path'
import followRedirects from 'follow-redirects'

followRedirects.maxBodyLength = 100 * 1024 * 1024

const upload = async (src, dest, axios) => {
  try {
    const file = path.join('/', dest, path.basename(src))
    const stream = fs.createReadStream(src)

    const res = await axios({
      url: file,
      method: 'PUT',
      data: stream,
      maxRedirects: 0,
      validateStatus: status => status < 500
    })

    return res.status === 201 ? file : false
  } catch (e) {
    throw new Error(e)
  }
}

export default upload
