import Logger from 'utils/logging'
import client from '../client'

// Should be able to not have prefix url if we get apis to run on each site under /api

export default async function isOmega(token: string): Promise<boolean> {
  // Only call the service if token is set, else just return false
  if (!token) return false

  const omegaStatus = await client({
    url: `/customer/omega`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    method: 'get',
  })
    .then((result) => {
      return result && result.data && result.data.omega
    })
    .catch((error) => {
      Logger.captureNetworkException(
        error,
        'customer/omega',
        'api.customer.Omega'
      )
      return false
    })

  return omegaStatus
}

