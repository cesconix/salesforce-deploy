import { EventEmitter } from 'events'
import mockFs from 'mock-fs'
import * as find from '../src/helpers/find'
import * as mkdir from '../src/helpers/mkdir'
import * as zip from '../src/helpers/zip'
import * as upload from '../src/helpers/upload'
import * as unzip from '../src/helpers/unzip'
import * as rm from '../src/helpers/rm'
import deploy from '../src/main'

const emitter = new EventEmitter()
const mockFileTree = {
  '/cartridges': {
    project_1: { int_foo: {}, int_bar: {} },
    project_2: { int_hello: {}, int_world: {} }
  }
}

describe('deploy', () => {
  it('should throw an exception if missed "hostname" property', async () => {
    const check = deploy({})
    await expect(check).rejects.toThrowError('Missing "Instance Hostname"')
  })

  it('should throw an exception if missed "username" property', async () => {
    const check = deploy({ hostname: 'test' })
    await expect(check).rejects.toThrowError(
      'Missing "Business Manager Username"'
    )
  })

  it('should throw an exception if missed "password" property', async () => {
    const check = deploy({ hostname: 'test', username: 'test' })
    await expect(check).rejects.toThrowError(
      'Missing "Business Manager Password"'
    )
  })

  it('should throw an exception if missed "codeVersion" property', async () => {
    const check = deploy({
      hostname: 'test',
      username: 'test',
      password: 'test'
    })
    await expect(check).rejects.toThrowError('Missing "Code Version"')
  })

  it('should throw an exception if missed "cartridges" property', async () => {
    const check = deploy({
      hostname: 'test',
      username: 'test',
      password: 'test',
      codeVersion: 'test'
    })
    await expect(check).rejects.toThrowError('Missing "Cartridges" source')
  })

  it('should throw an exception if a cartridge folder does not exist', async () => {
    // setup
    mockFs(mockFileTree)

    // work
    const check = deploy({
      hostname: 'test',
      username: 'test',
      password: 'test',
      codeVersion: 'test',
      cartridges: [
        { source: '/cartridges/project_1' },
        { source: '/cartridges/project_fail' }
      ],
      emitter
    })

    mockFs.restore()

    // assertions
    await expect(check).rejects.toThrowError(
      'Cartridges property contains invalid folders'
    )
  })

  it('should throw an exception if codeVersion exists', async () => {
    // setup
    mockFs(mockFileTree)
    find.default = jest.fn().mockImplementation(() => Promise.resolve(true))

    // work
    const check = deploy({
      hostname: 'test',
      username: 'test',
      password: 'test',
      codeVersion: 'test',
      cartridges: [
        { source: '/cartridges/project_1' },
        { source: '/cartridges/project_2' }
      ],
      emitter
    })

    mockFs.restore()

    // assertions
    await expect(check).rejects.toThrowError('Code version exists')
  })

  it('should upload webdav resource successfully', async () => {
    // setup
    mockFs(mockFileTree)
    find.default = jest.fn().mockImplementation(() => Promise.resolve(false))
    mkdir.default = jest.fn().mockImplementation(() => Promise.resolve(true))
    zip.default = jest
      .fn()
      .mockImplementation(() => Promise.resolve('/tmp/archive.zip'))
    upload.default = jest
      .fn()
      .mockImplementation(() => Promise.resolve('/Cartridges/test/archive.zip'))
    unzip.default = jest.fn().mockImplementation(() => Promise.resolve(true))
    rm.default = jest.fn().mockImplementation(() => Promise.resolve(true))

    // work
    const result = await deploy({
      hostname: 'test',
      username: 'test',
      password: 'test',
      codeVersion: 'test',
      cartridges: '/cartridges',
      force: true,
      emitter
    })

    mockFs.restore()

    // assertions
    expect(result).toEqual('/Cartridges/test/archive.zip')
  })
})
