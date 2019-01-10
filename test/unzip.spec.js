import nock from 'nock'
import mockAxios from './mockAxios'
import unzip from '../src/helpers/unzip'

const baseUrl = 'http://localhost'
const file = '/Cartridges/v1/archive.zip'

describe('helper: unzip', () => {
  it('should return "true" if archive has been extracted', async () => {
    nock(baseUrl).post(file, { method: 'unzip' }).reply(204, {})
    const result = await unzip(file, mockAxios)
    expect(result).toEqual(true)
  })

  it('should return "false" if archive has not been extracted', async () => {
    nock(baseUrl).post(file, { method: 'unzip' }).reply(200, {})
    const result = await unzip(file, mockAxios)
    expect(result).toEqual(false)
  })

  it('should throw an exception if server error occurs', async () => {
    nock(baseUrl).post(file, { method: 'unzip' }).reply(500, {})
    const check = unzip(file, mockAxios)
    await expect(check).rejects.toThrow()
  })
})
