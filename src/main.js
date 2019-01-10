import fs from 'fs'
import axios from 'axios'
import find from './helpers/find'
import mkdir from './helpers/mkdir'
import zip from './helpers/zip'
import upload from './helpers/upload'
import unzip from './helpers/unzip'
import rm from './helpers/rm'

const deploy = async ({ hostname, username, password, cartridges, codeVersion }) => {
  if (typeof cartridges === 'string') {
    cartridges = [ { source: cartridges } ]
  }

  try {
    cartridges.map(c => c.source).forEach(fs.accessSync)
  } catch (e) {
    throw new Error('Cartridges property contains invalid folders')
  }

  const instance = axios.create({
    baseURL: `https://${hostname}/on/demandware.servlet/webdav/Sites`,
    auth: { username, password }
  })

  const dest = `/Cartridges/${codeVersion}`

  try {
    const codeVersionExists = await find(dest, instance)

    if (codeVersionExists) {
      throw new Error('Code version exists')
    }

    await mkdir(dest, instance)

    let file

    file = await zip(cartridges, process.env.TMPDIR, codeVersion)
    file = await upload(file, dest, instance)

    await unzip(file, instance)
    await rm(file, instance)
  } catch (e) {
    console.error(e)
  }
}

export default deploy
