import gql from 'graphql-tag'

export const ASSET_BY_ID_QUERY = gql`
    query Asset($id: String!, $locale: String, $preview: Boolean) {
        asset(id: $id, locale: $locale, preview: $preview) {
            url
            title
            size
            width
            height
        }
    }
`

