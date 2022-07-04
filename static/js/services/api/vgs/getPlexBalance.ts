// import paths from 'config/paths'
import Logger from 'utils/logging'
import client from '../client'

export default async function getPlexBalance(token: string): Promise<number> {
  // Only call the service if token is set, else just return false
  // if (!token) return false

  const plexBalance = await client({
    url: '/vgs/plexbalance',
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    method: 'get',
  })
    .then((result) => {
      return result && result.data && result.data.balance
    })
    .catch((error) => {
      Logger.captureNetworkException(
        error,
        'vgs/plexbalance',
        'api.vgs.plexbalance'
      )
      return 'N/A'
    })

  return plexBalance
}

