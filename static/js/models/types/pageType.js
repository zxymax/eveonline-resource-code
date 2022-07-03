import { shape, string, arrayOf } from 'prop-types'
import { sectionType } from './sectionType'

export const pageType = shape({
    slug: string,
    metaTitle: string,
    metaDescription: string,
    metaImage: string,
    sections: arrayOf(sectionType),
})

export const arrayOfPageType = arrayOf(pageType)
