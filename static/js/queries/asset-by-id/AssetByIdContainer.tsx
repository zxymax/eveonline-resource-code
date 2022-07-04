import { useQuery } from '@apollo/client'
import getConfig, { isServer } from 'config/web'
import Logger from 'utils/logging'
import { ASSET_BY_ID_QUERY } from './query'

interface Props {
    id: string
    children: (props: unknown) => React.ReactElement
}

const { contentful: { preview } } = getConfig()

function AssetByIdQuery({ id, children }: Props): JSX.Element {
    const fetchPolicy = isServer ? 'cache-and-network' : 'cache-first'

    const { loading, error, data } = useQuery(ASSET_BY_ID_QUERY, {
        variables: { id, preview },
        fetchPolicy,
        errorPolicy: 'ignore',
    })

    let dataToRender
    if (data && data.asset && data.asset.url) {
        dataToRender = data.asset.url
    }

    if (loading && !dataToRender) return children('') // Returning empty so it will render correctly until the asset url has been fetched.
    if (error) {
        Logger.captureException(error)
        return children('') // Returning empty, no image is returned
    }

    if (dataToRender) return children(dataToRender)

    return children('')
}

export default AssetByIdQuery

