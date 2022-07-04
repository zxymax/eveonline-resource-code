import axios from 'axios'
import { getItem } from '../storage'

const instance = axios.create()

instance.interceptors.request.use((config) => {
    const token = getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.Pragma = 'no-cache'
    return config
})

export default instance

