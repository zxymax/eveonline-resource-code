import axios from 'axios'
import AdGlareResponse from 'models/AdGlareResponseModel'
import getConfig from 'config/web'
import Logger from 'utils/logging'

const { adGlareUrl } = getConfig()

export async function getAds(language: string): Promise<AdGlareResponse> {
  const endpoint = `${adGlareUrl}&ag_custom_term=${language}`

  const allAds = axios
    .get(endpoint, {
      headers: { 'Accept-Language': language },
    })
    .then((response) => {
      // Success 🎉
      return response.data.response
    })
    .catch((error) => {
      Logger.captureNetworkException(
        error,
        endpoint,
        'api.adglare.getAds'
      )
      return 'N/A'
    })
  return allAds
}

