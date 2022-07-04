import ImageType from 'models/types/ts/imageType'

export const getImage = (imageFile: ImageType): string | undefined => {
    if (imageFile && imageFile.url) return imageFile.url

    return undefined
}

// eslint-disable-next-line
export function lightOrDark(color: any): string {
    /**
     * * Return color based on color contrast
     * * E.g if color in param is #fff it returns dark color (#101010)
     */

    let clr = color
    if (clr.length < 5) {
        clr += color.slice(1)
    }

    return clr.replace('#', '0x') > 0xffffff / 2 ? '#101010' : '#fff' // typescript-disable-line
}

export function slugify(name: string): string {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    /* eslint no-useless-escape: 0 */

    if (name) {
        return name
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    }

    return null
}
