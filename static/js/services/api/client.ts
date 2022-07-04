import axios from 'axios'
import getConfig from 'config/web'

// Client to be used for all calls into backend api at  /api
// For example /api/stream or /api/customer/omega

// local web api
// const baseURL = 'https://localhost:44348'

// const baseURL = 'https://dev.ccpeveweb.com/api'
// Dev web api
// const baseURL = 'https://umip1v3tqb.execute-api.eu-west-1.amazonaws.com/Prod'

// Staging web api
// const baseURL = 'https://cb2dzccayg.execute-api.eu-west-1.amazonaws.com/Prod'

// Production web api
// const baseURL = 'https://w778zk1gu3.execute-api.eu-west-1.amazonaws.com/Prod'

const { webApiUrl: baseURL } = getConfig()

// DEV web api - connecting to Bacchus
// const baseURL = 'https://umip1v3tqb.execute-api.eu-west-1.amazonaws.com/Prod'

// DEV web api - connecting to Bacchus
// const baseURL = 'https://umip1v3tqb.execute-api.eu-west-1.amazonaws.com/Prod'

const instance = axios.create({
  baseURL,
  // headers: {
  //     'Authorization': `Basic ${token}`,
  //     'Accept': 'application/json'
  // }
})

// instance.interceptors.request.use((config) => {
//     if (token) {
//         config.headers.Authorization = `Basic ${token}`
//         config.headers.Accept = 'application/json'
//     }
//     // config.headers.Pragma = 'no-cache'
//     return config
// })

export default instance

