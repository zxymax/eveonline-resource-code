import Crypto from 'crypto'
import sjcl from 'sjcl'
import { getItem, setItem } from 'utils/storage'
import Logger from 'utils/logging'

const SESSION_ID_KEY = 'session-id'

const generateId = () =>
    new Promise((resolve, reject) =>
        Crypto.randomBytes(64, (err, buffer) => {
            const token = buffer.toString('base64')
            const out = sjcl.hash.sha256.hash(token)
            const hashed = sjcl.codec.base64url.fromBits(out)

            if (hashed == null)
                return reject(new Error('Session ID hash was not generated'))

            setItem(SESSION_ID_KEY, hashed)

            return resolve(hashed)
        })
    )

export const getSessionId = () => getItem(SESSION_ID_KEY)

const sessionId = () =>
    new Promise((resolve, reject) => {
        const id = getSessionId()

        if (id != null) return resolve(id)

        generateId()
            .then((result) => resolve(result))
            .catch((err) =>
                Logger.captureException(err, {
                    category: 'session',
                    message: err.message,
                })
            )
    })

export default sessionId

