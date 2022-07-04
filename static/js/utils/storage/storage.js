import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function getItem(key) {
    return cookies.get(key)
}

export function setItem(key, value, options = {}) {
    cookies.set(key, value, {
        path: '/',
        secure: true,
        sameSite: 'lax',
        ...options,
    })
}

export function removeItem(key, options = {}) {
    // console.log(`Removing cookie ${key}`)
    cookies.remove(key, {
        path: '/',
        secure: true,
        sameSite: 'lax',
        ...options,
    })
}

