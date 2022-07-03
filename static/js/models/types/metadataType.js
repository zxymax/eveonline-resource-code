import { shape, string } from 'prop-types'

const metadataType = shape({
    metaTitle: string,
    metaDescription: string,
    metaImage: string,
})

export default metadataType
