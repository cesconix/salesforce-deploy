import nock from 'nock'
import mockAxios from './mockAxios'
import find from '../src/helpers/find'

describe('helper: find', () => {
  it('should return "true" if webdav resource exists', async () => {
    // setup
    nock('http://localhost').intercept('/Cartridges/v1', 'propfind').reply(207, {})

    // work
    const result = await find('/Cartridges/v1', mockAxios)

    // expect
    expect(result).toEqual(true)
  })

  it('should return "false" if webdav resource exists', async () => {
    // setup
    nock('http://localhost').intercept('/Cartridges/v1', 'propfind').reply(404, {})

    // work
    const result = await find('/Cartridges/v1', mockAxios)

    // expect
    expect(result).toEqual(false)
  })

  it('should throw an exception if server error occurs', async () => {
    // setup
    nock('http://localhost').intercept('/Cartridges/v1', 'propfind').reply(500, {})

    // work
    const check = find('/Cartridges/v1', mockAxios)

    // expect
    await expect(check).rejects.toThrow()
  })
})
