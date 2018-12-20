import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const zip = (source, target, sourcePaths = ['**/*']) => {
  return new Promise(resolve => {
    const cwd = process.cwd()
    const archive = archiver('zip', { zlib: { level: 9 } })
    const file = path.resolve(cwd, target, 'archive.zip')
    const output = fs.createWriteStream(file)

    if (!path.isAbsolute(source)) {
      source = path.join(cwd, source)
    }

    output.on('close', () => {
      resolve(file)
    })

    archive.on('error', error => {
      throw error
    })

    archive.pipe(output)

    sourcePaths.forEach(sourcePath => {
      archive.glob(sourcePath, {
        cwd: source,
        ignore: ['**/node_modules/**']
      })
    })

    archive.finalize()
  })
}

export default zip
