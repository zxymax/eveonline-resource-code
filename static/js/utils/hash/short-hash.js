export const generateHash = (value) => {
    let hashc = 5381
    let index = value.length

    while (index) {
        // eslint-disable-next-line
        hashc = (hashc * 33) ^ value.charCodeAt(--index)
    }

    // eslint-disable-next-line
    return hashc >>> 0
}

const isObject = (value) => value === Object(value)

export const shortHash = (value) => {
    let val = value

    // Ensure that if object was passed on, that we stirngify it
    if (isObject(value)) {
        val = JSON.stringify(val)
    }

    return generateHash(val).toString(16)
}

