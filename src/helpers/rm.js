import path from 'path'

const rm = async (file, axios) => {
  return axios({
    url: path.join('/', file),
    method: 'delete'
  })
}

export default rm
