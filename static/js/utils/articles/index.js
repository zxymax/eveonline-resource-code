// This is it! Code that generates our "awesome" hashed article id based on article firstPublishedAt property
export function getHash(item) {
    const createdAt = item && item.sys && item.sys.firstPublishedAt
    // The | is bitwise and is not allowed in eslint rules, disabling it here
    const unixTimestamp = (new Date(createdAt) / 1000) | 0 // eslint-disable-line
    const id = unixTimestamp.toString(36)
    return id
}

export function getArticleUrl(item, slug) {
    return `/article/${getHash(item)}/${slug}`
}

