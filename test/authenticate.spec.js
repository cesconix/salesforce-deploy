import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import authenticate from '../src/helpers/authenticate'

const mock = new MockAdapter(axios)

const url = 'https://account.demandware.com/dw/oauth2/access_token'
const credentials = { clientId: 'test', clientPassword: 'test' }

describe('authenticate', () => {
  it('should fetch an access token', async () => {
    expect.assertions(1)
    const mockResponse = { access_token: 'token' }
    mock.onPost(url).reply(200, mockResponse)
    await expect(authenticate(credentials)).resolves.toEqual(mockResponse.access_token)
  })

  it('should fails with an error', async () => {
    expect.assertions(1)
    mock.onPost(url).networkError()
    await expect(authenticate(credentials)).rejects.toThrow()
  })
})
