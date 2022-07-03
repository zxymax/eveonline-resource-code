import { shape, string, date, arrayOf } from 'prop-types'

export const contentType = shape({
    name: string,
    date,
    buttonText: string,
    buttonUrl: string,
    buttonTheme: string,
})

export const arrayOfContentType = arrayOf(contentType)

// export default contentType
