import React, { Component, Fragment } from 'react'
import { Translate } from 'react-localize-redux'
import { redirect } from 'redux-first-router'
import axios from 'axios'
import ReCaptcha from 'react-google-recaptcha'
// import TagManager from 'react-gtm-module'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ClipLoader } from 'react-spinners'
// import { Icon } from 'layouts'
import Logger from 'utils/logging'
import { flags } from 'config'
import Analytics from 'utils/analytics'
import ProtoManager from 'proto'
import { setAfterSignupCookies } from 'features/playnow/PlayNowStorage'
import NewSignupForm from 'features/forms/signup'
import getConfig, { isClient } from 'config/web'
import getSettings from 'settings'
import JourneyIdManager from 'proto/helpers/journeyid'
import LauncherTokenManager from 'proto/helpers/launchertoken'
import TermsOfService from './components/terms-of-service/TermsOfService'

// import Success from './components/success' // Not used anymore
import validateEmail from '../../../../validations/validateEmail' // TODO move these to helpers
import validateUsername from '../../../../validations/validateUsername'
import validatePassword from '../../../../validations/validatePassword'
import style from './SignupForm.scss'

const {
    webBaseUrl,
    signupServiceUrl,
    optimizeAutoLoginExperimentId,
} = getConfig()

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.api = signupServiceUrl
        // this.api = 'https://localhost:44337/'
        this.state = {
            code: null,
            loading: false,
            tokenInvalid: false,
            tosActive: false,
            variant: null,
        }
        this.journeyIdManager = new JourneyIdManager()
        this.launcherTokenManager = new LauncherTokenManager()
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false)

        if (this.props.onHasLoaded !== undefined) {
            this.props.onHasLoaded() // sending back to parent if they want to know
        }
        if (isClient && optimizeAutoLoginExperimentId) {
            this.optimizeInterval = setInterval(() => {
                if (window.google_optimize !== undefined) {
                    const variant = window.google_optimize.get(
                        optimizeAutoLoginExperimentId
                    )
                    this.setVariant(variant)
                    if (variant) {
                        clearInterval(this.optimizeInterval)
                        this.optimizeInterval = null
                    }
                }
            }, 250)
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false)
        if (this.optimizeInterval) {
            clearInterval(this.optimizeInterval)
        }
    }

    escFunction = () => {
        this.setState((state) => ({ ...state, tosActive: false }))
    }

    change = (value) => {
        this.setState((state) => ({ ...state, code: value }))
    }

    setVariant = (value) => {
        this.setState((state) => ({ ...state, variant: value }))
    }

    generateEmailLink = (url) => {
        const { language } = this.props
        const lang = language === 'en' ? '' : `/${language}`

        return `${webBaseUrl}${lang}/${url}`
    }

    signupSuccessRedirect = () => {
        ;(async () => {
            let download = this.props.autoDownload ? 'true' : 'false'

            // autodownload can be overwritten to manual download page with A/B test by adding hidden input field with id=download and value=false. It needs to be inserted in HTML before this hidden filed or be renamed to something else after the other one is injected.
            if (isClient) {
                const autodownloadOverwriteEl = document.getElementById(
                    'download'
                )

                if (autodownloadOverwriteEl) {
                    const value = autodownloadOverwriteEl.value
                    if (value === 'true') {
                        download = 'true'
                    } else if (value === 'false') {
                        download = 'false'
                    }
                } // Element not found so doing nothing.
            }

            // Redirect signup-verify to correct lang if needed.
            const lang =
                this.props.language === 'en' ? null : this.props.language

            let payload = {
                lang,
                page: 'signup-verify',
                query: {
                    rec: this.props.invc ? 'true' : 'false',
                    signupSuccess: 'true',
                    download,
                },
            }

            // Only do this if playNow is true.
            // This overwrites the payload to redirect to EVE Anywhere signup-confirmation page
            if (this.props.playNow) {
                payload = {
                    lang,
                    page: 'signup-confirmation',
                }
                Logger.captureMessage(
                    'playNow is active in Signup form.',
                    null,
                    {
                        category: 'playnow',
                        location: 'SignupForm.signupSuccessRedirect',
                    }
                )
            }

            this.props.dispatch(
                redirect({
                    type: 'PAGE',
                    payload,
                })
            )
        })()
    }

    // signupSuccessUpSellRedirect = () => {
    //     if (isClient) {
    //         window.location.replace('https://secure.eveonline.com//Checkout/?goid=MBedEDyThkwVkyUaqZWN2g2&product=dlc')
    //     }
    // }

    handlePasswordValidationResponse = (response) => {
        if (response === 'Password is not valid') {
            // TODO replace with new datalayer event helper.
            const validationEvent = {
                event: 'Interaction',
                eventCategory: 'form interactions',
                eventAction: 'form: signup',
                eventLabel: 'error - password is not secure',
            }
            Analytics.PushEventObject(validationEvent)
            return this.props.translate(
                'signup.validation.passwordNotValidOrBreached'
            )
        }
        return response
    }

    handleSubmit = (
        fields,
        { setSubmitting, setErrors, setFieldValue },
        recaptchaValue
        // isUpSell
    ) => {
        // TODO Error check fields again? with services?

        const data = {
            recruitToken: this.props.invc,
            password: fields.password,
            emailAddress: fields.email,
            username: fields.username,
            language: this.props.language,
            agreedTermsOfService: fields.agreedTerms,
            journeyId: this.journeyIdManager.getJourneyId(),
            recaptchaType: 'Invisible',
            emailVerificationSuccessUrl: this.generateEmailLink(
                this.props.emailVerificationSuccessUrl
            ),
            emailVerificationFailedUrl: this.generateEmailLink(
                this.props.emailVerificationFailedUrl
            ),
            'g-recaptcha-response': recaptchaValue,
            playNow: this.props.playNow,
        }

        // console.log('The data ', data)

        this.setState({ success: false, loading: false })
        axios
            .post(`${this.api}/api/v2/signup/web`, data)
            .then((response) => {
                if (response.status === 201 && response.data.userCreated) {
                    // Pushing userId to data layer with correct properties.
                    const userId = response.data.hashedUserId
                    const autoLoginExperiment = !(
                        this.state.variant === '1' || this.state.variant === 1
                    )

                    // Analytics.PushVariable('UserID', userId)
                    Analytics.PushEventObject({ UserID: userId })
                    this.setState({
                        // success: true,
                        loading: false,
                        // email: fields.email,
                    })

                    // userToken is EVE token to be used to authenticate with our backend api
                    // playToken is token to use with ENDGAME and should not be needed in the response here
                    const {
                        userToken,
                        playToken,
                        launcherToken,
                    } = response.data
                    const { username } = data

                    if (autoLoginExperiment && !!launcherToken) {
                        this.launcherTokenManager.setLauncherToken(
                            launcherToken
                        )
                    }

                    setAfterSignupCookies(userToken, username, playToken)

                    // console.log('user id after signup: ', response.data.userId)
                    // Always calling this on signup, inside there is logic that turns this on/off
                    // Default config now is that nothing happens

                    getSettings().then((settings) => {
                        ProtoManager.publishAccountCreatedEvent(
                            response.data.userId,
                            settings
                        )
                    })

                    this.signupSuccessRedirect()

                    // if (isUpSell) {
                    //     this.signupSuccessUpSellRedirect()
                    // }
                    // else {
                    // this.signupSuccessRedirect()
                    // }
                }
            })
            .catch((error) => {
                // const errors = response.data.errors
                // console.log('error inside handleSubmit: ', error)

                if (error.response) {
                    // 409 is conflict, meaning that something is wrong with the input. Getting errors and adding to form validation
                    if (error.response.status === 409) {
                        if (error.response.data && error.response.data.errors) {
                            const errors = error.response.data.errors

                            setErrors({
                                email: errors.emailAddress,
                                username: errors.username,
                                password: this.handlePasswordValidationResponse(
                                    errors.password
                                ),
                                agreedTerms: errors.agreedTermsOfService,
                            })
                            setFieldValue('recaptcha', null)
                            setSubmitting(false)

                            this.setState({
                                // success: false,
                                loading: false,
                                code: null,
                                tosValidationMsg: errors.agreedTermsOfService,
                            })
                        }
                    } else {
                        // Another error occured. Adding it to common error display in form to show to user.
                        setErrors({
                            global: this.props.translate(
                                'common.error',
                                { code: `(${error.response.status})` },
                                { renderInnerHtml: true }
                            ),
                        })
                        setSubmitting(false)
                        // TODO NOT USED !!
                        this.setState({
                            // success: false,
                            loading: false,
                        })

                        Logger.captureException(error, null, {
                            category: 'signup',
                            location: 'handleSubmit',
                            message: error.message,
                        })
                    }
                } else {
                    Logger.captureException(error, null, {
                        category: 'signup',
                        location: 'handleSubmit',
                        message: error.message,
                    })
                }
            })
    }

    // eslint-disable-next-line
    renderInvalidToken() {
        return (
            <div className={style.error}>
                <Translate id="invalidToken">
                    {({ translate }) => (
                        <>
                            <p>{translate('signup.invalidToken')}</p>
                            <p>
                                {translate('signup.invalidTokenCS')}{' '}
                                <a href="https://support.eveonline.com/hc/en-us">
                                    {translate('common.customerSupport')}
                                </a>
                            </p>
                        </>
                    )}
                </Translate>
            </div>
        )
    }

    renderForm() {
        return (
            <>
                <NewSignupForm
                    handleSubmit={this.handleSubmit}
                    validateEmail={validateEmail}
                    validateUsername={validateUsername}
                    validatePassword={validatePassword}
                    handleBlur={this.handleBlurTest}
                    handleChange={this.handleChangeTest}
                    language={this.props.language}
                    showLogin={this.props.showLogin}
                    theme={this.props.theme}
                    //   hasUpsell={this.props.hasUpsell}
                />
                {/* Can be added in A/B test to overwrite manual vs auto */}
                {/* <input id="download" value="false" type="hidden" /> */}
            </>
        )
    }

    // eslint-disable-next-line
    renderLoader() {
        return (
            <div className={style.loader}>
                <ClipLoader size={190} color="#953218" loading />
            </div>
        )
    }

    render() {
        if (this.state.tokenInvalid) {
            return this.renderInvalidToken()
        }
        // TODO NOT USED !!
        if (this.state.loading) {
            return this.renderLoader()
        }
        return this.renderForm()
    }
}

SignupForm.propTypes = {
    invc: PropTypes.string,
    language: PropTypes.string,
    emailVerificationSuccessUrl: PropTypes.string,
    emailVerificationFailedUrl: PropTypes.string,
    autoDownload: PropTypes.bool,
    translate: PropTypes.func,
    playNow: PropTypes.bool,
    showLogin: PropTypes.bool,
    onHasLoaded: PropTypes.func,
    theme: PropTypes.oneOf(['dark', 'light', 'quadrant']),
}

SignupForm.defaultProps = {
    playNow: false,
    showLogin: true,
    theme: 'dark',
}

export default SignupForm

