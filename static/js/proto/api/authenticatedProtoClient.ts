import axios from 'axios'
import getConfig from 'config/web'

const { grpcGatewayUrl: baseURL } = getConfig()

// console.log('grpc gateway endpoint: ', baseURL)

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/protobuf',
  },
})

export default instance

