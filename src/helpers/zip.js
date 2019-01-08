import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const zip = async (src, dest, name) => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } })
    const file = path.resolve(dest, `${name}.zip`)
    const output = fs.createWriteStream(file)

    output.on('close', () => {
      resolve(file)
    })

    archive.on('error', error => {
      reject(error)
    })

    archive.pipe(output)

    src.forEach(sourcePath => {
      archive.glob('**/*', {
        cwd: sourcePath.source,
        ignore: sourcePath.exclude
      })
    })

    archive.finalize()
  })
}

export default zip
