import { EventEmitter } from 'events'
import fs from 'fs'
import axios from 'axios'
import find from './helpers/find'
import mkdir from './helpers/mkdir'
import zip from './helpers/zip'
import upload from './helpers/upload'
import unzip from './helpers/unzip'
import rm from './helpers/rm'

const deploy = async ({ hostname, username, password, cartridges, codeVersion, force = false, emitter = new EventEmitter() }) => {
  if (!hostname) {
    throw new Error('Missing "Instance Hostname"')
  }

  if (!username) {
    throw new Error('Missing "Business Manager Username"')
  }

  if (!password) {
    throw new Error('Missing "Business Manager Password"')
  }

  if (!codeVersion) {
    throw new Error('Missing "Code Version"')
  }

  if (!cartridges) {
    throw new Error('Missing "Cartridges" source')
  }

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
    if (force) {
      emitter.emit('force', codeVersion)
      await rm(dest, instance)
    }

    emitter.emit('checkCodeVersion', codeVersion)
    const codeVersionExists = await find(dest, instance)
    if (codeVersionExists) {
      throw new Error('Code version exists')
    }

    emitter.emit('mkdir', dest)
    await mkdir(dest, instance)

    let file

    emitter.emit('zip', cartridges)
    file = await zip(cartridges, process.env.TMPDIR, codeVersion)

    emitter.emit('upload', file)
    file = await upload(file, dest, instance)

    emitter.emit('unzip', file)
    await unzip(file, instance)

    emitter.emit('rm', file)
    await rm(file, instance)

    emitter.emit('deployed', true)

    return file
  } catch (e) {
    emitter.emit('deployed', false)
    throw new Error(e)
  }
}

export default deploy
