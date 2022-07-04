import { fetchPageWithoutDispatch } from 'lib/pages/api'

export default async function getExternalSettings(
  environment: string
): Promise<unknown> {
  return fetchPageWithoutDispatch('settings-page', 'en')
    .then((response) => {
      if (response) {
        const { data } = response
        return data && data.config && data.config[environment]
      }
      return null
    })
    .catch(() => {
      // do nothing, external file not found and rest should use defaults
    })
}

