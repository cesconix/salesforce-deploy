
import nock from 'nock'
import mockAxios from 'axios'
import mockFs from 'mock-fs'
import upload from '../src/helpers/upload'

const baseUrl = 'http://localhost'
const src = '/home/cesconix/file'
const dest = '/Cartridges/v1'

describe('helper: upload', () => {
  beforeEach(() => {
    mockFs({ '/home/cesconix/file': 'Hello 👋 I\'m a fake content' })
  })

  afterEach(mockFs.restore)

  it('should return remote filepath if upload success', async () => {
    const remoteFile = '/Cartridges/v1/file'
    nock(baseUrl).put(remoteFile).reply(201, {})

    const result = await upload(src, dest, mockAxios)

    expect(result).toEqual(remoteFile)
  })

  it('should return "false" if upload fails', async () => {
    const remoteFile = '/Cartridges/v1/file'
    nock(baseUrl).put(remoteFile).reply(204, {})

    const result = await upload(src, dest, mockAxios)

    expect(result).toEqual(false)
  })

  it('should throw error if server error occurs', async () => {
    const remoteFile = '/Cartridges/v1/file'
    nock(baseUrl).put(remoteFile).reply(500, {})

    const check = upload(src, dest, mockAxios)

    await expect(check).rejects.toThrow()
  })
})
