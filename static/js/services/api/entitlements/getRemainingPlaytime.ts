import EntitlementCurrent from 'models/entitlements/EntitlementsModel'
import Logger from 'utils/logging'
import client from '../client'

export default async function getPlayTimeEntitlement(
  token: string
): Promise<EntitlementCurrent> {
  const entitlement = await client({
    url: `/entitlement/current`,
    // url: `https://umip1v3tqb.execute-api.eu-west-1.amazonaws.com/Prod/api/entitlement/current`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    method: 'get',
  })
    .then((result) => {
      return result && result.data && result.data
    })
    .catch((error) => {
      // This happens if user is not authorized at all to call the endpoint.
      Logger.captureNetworkException(
        error,
        'entitlement/current',
        'api.entitlement.Current'
      )
      return 'N/A'
    })

  return entitlement
}
