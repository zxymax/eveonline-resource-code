import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import qs from 'qs'
import _get from 'lodash/get'
import _trimStart from 'lodash/trimStart'
import getConfig, { isClient } from 'config/web'
import { getItem, removeItem } from 'utils/storage'
import {
    convertExpiresSecondsToTime,
    VERIFIER_KEY,
    PREVIOUS_PATH_COOKIE,
    setRefreshToken,
} from '../../helpers/token'
import isValidState  from '../../helpers/isValidState'

const { authentication: { clientId, redirectUrl, tokenUrl} } = getConfig()

class CallBack extends Component {
    componentDidMount() {
        if (isClient) {
            const query = qs.parse(_trimStart(window.location.search, '?'))
            const prevPath = getItem(PREVIOUS_PATH_COOKIE)

            // const prevPathFromCookie = getItem('www_prev_path')

            const {
                loginSuccess,
                loginFailure,
                getRedirectFromPath,
                redirect,
            } = this.props

            if (this.props.isLoggedIn) {
                redirect(getRedirectFromPath(prevPath))
                return
            }

            if (query.code && isValidState(query.state)) {
                // PKCE
                const verifier = getItem(VERIFIER_KEY)

                const body = {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    redirect_uri: redirectUrl,
                    code: query.code,
                    code_verifier: verifier,
                }

                axios(tokenUrl, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify(body),
                })
                    .then((response) => {
                        const {
                            expires_in,
                            access_token,
                            refresh_token,
                        } = _get(response, 'data', {})

                        if (access_token && expires_in) {
                            // Store access token
                            loginSuccess(
                                access_token,
                                convertExpiresSecondsToTime(expires_in)
                            )

                            // Store refresh token
                            if (refresh_token) {
                                setRefreshToken(refresh_token)
                            }

                            // Remove verifier token
                            removeItem(VERIFIER_KEY)
                            removeItem(PREVIOUS_PATH_COOKIE)
                            return access_token
                        }
                    })
                    .then((token) => {
                        // Going to where we were before logging in
                        window.location.replace(prevPath)
                    })
                    .catch((err) => {
                        loginFailure(err)
                        redirect(getRedirectFromPath(''))
                    })
            } else {
                loginFailure(
                    'Login could not complete as code or state are invalid'
                )
                redirect(getRedirectFromPath(''))
            }
        }
    }

    render() {
        return this.props.children
    }
}

CallBack.propTypes = {
    isLoggedIn: PropTypes.bool,
    children: PropTypes.node,
    loginSuccess: PropTypes.func.isRequired,
    loginFailure: PropTypes.func.isRequired,
    getRedirectFromPath: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
    tokenData: PropTypes.object, // eslint-disable-line
}

export default CallBack
