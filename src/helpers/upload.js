import fs from 'fs'
import path from 'path'

const upload = async (src, dest, axios) => {
  try {
    const file = path.join('/', dest, path.basename(src))
    const stream = fs.createReadStream(src)

    await axios({
      url: file,
      method: 'put',
      data: stream
    })

    return file
  } catch (e) {
    throw new Error(e)
  }
}

export default upload
