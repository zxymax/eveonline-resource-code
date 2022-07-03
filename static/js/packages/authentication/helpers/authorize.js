import Crypto from 'crypto'
import sjcl from 'sjcl'
import qs from 'qs'
import { SetUniqueState, VERIFIER_KEY } from './token'
import { setItem } from '../../../utils/storage'

const PREVIOUS_PATH_COOKIE = 'www_prev_path'

export function login(previousPath, config) {
    const state = `${Date.now()}${Math.random()}`

    return new Promise((resolve, reject) =>
        Crypto.randomBytes(64, (err, buffer) => {
            if (!config)
                return reject(
                    new Error(`Login failed as no configuration was provided`)
                )

            const token = buffer.toString('base64')

            const out = sjcl.hash.sha256.hash(token)
            const hashed = sjcl.codec.base64url.fromBits(out)

            const query = qs.stringify(
                {
                    client_id: config.clientId,
                    response_type: 'code',
                    scope: config.scopes,
                    redirect_uri: encodeURI(
                        config.redirectUrl // + encodeURIComponent(previousPath)
                    ),
                    state,
                    code_challenge_method: 'S256',
                    code_challenge: hashed,
                },
                { encodeValuesOnly: true }
            )

            SetUniqueState(state)
            setItem(VERIFIER_KEY, token)
            setItem(PREVIOUS_PATH_COOKIE, previousPath)

            window.location = `${config.authUrl}?${query}`
        })
    )
}

export function logoutRedirect(logoutUrl) {
    const url = `${logoutUrl}${encodeURI(window.location.origin)}`

    window.location = url
}
