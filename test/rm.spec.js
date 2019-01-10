import nock from 'nock'
import mockAxios from './mockAxios'
import rm from '../src/helpers/rm'

const baseUrl = 'http://localhost'
const dirpath = '/Cartridges/folderToDelete'

describe('helper: rm', () => {
  it('should return "true" if webdav resource has been deleted', async () => {
    nock(baseUrl).delete(dirpath).reply(204, {})
    const result = await rm(dirpath, mockAxios)
    expect(result).toEqual(true)
  })

  it('should return "false" if webdav resource has not been deleted', async () => {
    nock(baseUrl).delete(dirpath).reply(404, {})
    const result = await rm(dirpath, mockAxios)
    expect(result).toEqual(false)
  })

  it('should throw an exception if server error occurs', async () => {
    nock(baseUrl).delete(dirpath).reply(500, {})
    const check = rm(dirpath, mockAxios)
    await expect(check).rejects.toThrow()
  })
})
