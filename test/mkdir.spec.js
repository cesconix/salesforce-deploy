import nock from 'nock'
import mockAxios from './mockAxios'
import mkdir from '../src/helpers/mkdir'

const baseUrl = 'http://localhost'
const dirpath = '/Cartridges/folder'

describe('helper: mkdir', () => {
  it('should return "true" if webdav folder has been created', async () => {
    nock(baseUrl).intercept(dirpath, 'mkcol').reply(201, {})
    const result = await mkdir(dirpath, mockAxios)
    expect(result).toEqual(true)
  })

  it('should return "false" if webdav folder exists', async () => {
    nock(baseUrl).intercept(dirpath, 'mkcol').reply(405, {})
    const result = await mkdir(dirpath, mockAxios)
    expect(result).toEqual(false)
  })

  it('should throw an exception if server error occurs', async () => {
    nock(baseUrl).intercept(dirpath, 'mkcol').reply(500, {})
    const check = mkdir(dirpath, mockAxios)
    await expect(check).rejects.toThrow()
  })
})
