export default function isExternal(path: string): boolean {
    const isLink = typeof path !== 'undefined'

    const external =
        isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(path || '')

    if (external) return true

    return false
}

