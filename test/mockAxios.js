import axios from 'axios'

const mockAxios = axios.create({
  baseURL: `http://localhost`,
  auth: { username: 'user', password: 'pass' }
})

export default mockAxios
