import { shape, string, arrayOf, oneOfType } from 'prop-types'
import { contentType } from './contentType'

export const sectionType = shape({
    headline: string,
    body: string,
    imageFile: oneOfType([
        string,
        shape({
            url: string,
        }),
    ]),
    backgroundImage: string,
    buttonText: string,
    buttonUrl: string,
    videoId: string,
    content: arrayOf(contentType),
})

export const arrayOfSectionType = arrayOf(sectionType)
