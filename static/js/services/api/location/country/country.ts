// import client from '../client'
// import { isDevelopment, isLocal } from 'config/web'
import Logger from 'utils/logging'
import client from '../../client'

// This is the first one that can use /api/x without api prefix. It is running under website /api

export async function getCountry(): Promise<string> {
  // const endpoint = 'location/country'
  const theCountry = client
    .get('/location/country')
    .then((response) => {
      // Success 🎉
      if (response?.data?.country) return response.data.country

      return 'NOT_SET'
    })
    .catch((error) => {
      Logger.captureNetworkException(
        error,
        'location/country',
        'api.location.country'
      )
      return 'N/A'
    })

  return theCountry
}

