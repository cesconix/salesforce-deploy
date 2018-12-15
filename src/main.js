import authenticate from './helpers/authenticate'

const main = async () => {
  try {
    const token = await authenticate({
      clientId: '***REMOVED***',
      clientPassword: '***REMOVED***'
    })
    console.log(token)
  } catch (err) {
    console.log(err)
  }
}

main()

export default main
