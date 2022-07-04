import gql from 'graphql-tag'

export const SECTTION_BY_ID_QUERY = gql`
    query SectionById($identifier: String, $locale: String, $preview: Boolean) {
        sectionCollection(
            limit: 20
            locale: $locale
            preview: $preview
            where: { identifier: $identifier }
        ) {
            items {
                name
                sys {
                    id
                }
                headline
                teaser
                body
                buttonText
                buttonUrl
                template
                videoId
                backgroundImage
                imageFile {
                    url
                }
                theme
                identifier
                contentCollection(limit: 20) {
                    total
                    items {
                        ... on Content {
                            name
                            sys {
                                id
                            }
                            headline
                            body
                            buttonText
                            buttonUrl
                            buttonTheme
                            date
                            imageFile {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`

