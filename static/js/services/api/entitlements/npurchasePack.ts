// import paths from 'config/paths'
import Logger from 'utils/logging'
import client from '../client'

export default async function buyPack(
  token: string,
  packName: string
): Promise<boolean> {
  const purchaseSuccess = await client({
    url: `/entitlement/purchase/${packName}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    method: 'post',
  })
    .then((result) => {
      return result && result.data && result.data.success === true
    })
    .catch((error) => {
      Logger.captureNetworkException(
        error,
        'entitlement/purchase',
        'api.entitlement.purchase'
      )
      return false
    })

  return purchaseSuccess
}

