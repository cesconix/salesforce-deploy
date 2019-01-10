import nock from 'nock'
import mockAxios from './mockAxios'
import find from '../src/helpers/find'

const baseUrl = 'http://localhost'
const dirpath = '/Cartridges/v1'

describe('helper: find', () => {
  it('should return "true" if webdav resource exists', async () => {
    nock(baseUrl).intercept(dirpath, 'propfind').reply(207, {})
    const result = await find(dirpath, mockAxios)
    expect(result).toEqual(true)
  })

  it('should return "false" if webdav resource exists', async () => {
    nock(baseUrl).intercept(dirpath, 'propfind').reply(404, {})
    const result = await find(dirpath, mockAxios)
    expect(result).toEqual(false)
  })

  it('should throw an exception if server error occurs', async () => {
    nock(baseUrl).intercept(dirpath, 'propfind').reply(500, {})
    const check = find(dirpath, mockAxios)
    await expect(check).rejects.toThrow()
  })
})
