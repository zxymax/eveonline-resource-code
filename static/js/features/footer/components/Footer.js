import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import _includes from 'lodash/includes'
import PropTypes from 'prop-types'
import { Container } from 'layouts'
import Link from 'features/link'
import SelectLanguage from 'features/select-language'
import SocialIcons from 'features/upgrade/social-icons'
import { flags, version } from 'config'
import getConfig, { isProduction, environment } from 'config/web'
import SectionById from 'queries/SectionByIdQuery'

import style from './Footer.scss'

const config = getConfig()
const { slices, contentful, signupServiceUrl, recruitmentServiceUrl, sentryDsn, testVariable } = config

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = { pegi: true }
    }

    renderSocial = (headline) => (
        <div className={`${style.row} ${style.top}`}>
            <h3>{headline}</h3>
            <SocialIcons className={style.social} />
        </div>
    )

    renderColumn = (content) =>
        content && (
            <div className={style.col}>
                <ReactMarkdown source={content.body} escapeHtml={false} />
            </div>
        )

    renderDevLinks = () => (
        <div className={style.col}>
            <ul>
                <li>DEV LINKS</li>
                {flags.isDevelopment && (
                    <li>
                        <Link path={{ page: 'my-year-in-eve-config' }}>
                            Personalized Video
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link path={{ page: 'signup' }}>Signup</Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link
                            path={{
                                page: 'signup-verify',
                                query: {
                                    rec: 'false',
                                    signupSuccess: 'true',
                                    download: 'false',
                                },
                            }}
                        >
                            Signup Success - Manual
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link
                            path={{
                                page: 'signup-verify',
                                query: {
                                    rec: 'true',
                                    signupSuccess: 'true',
                                    download: 'false',
                                },
                            }}
                        >
                            Recruit Signup Success - Manual
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link
                            path={{
                                page: 'signup-verify',
                                query: {
                                    rec: 'false',
                                    signupSuccess: 'true',
                                    download: 'true',
                                },
                            }}
                        >
                            Signup Success - Auto
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link
                            path={{
                                page: 'signup-verify',
                                query: {
                                    rec: 'true',
                                    signupSuccess: 'true',
                                    download: 'true',
                                },
                            }}
                        >
                            Recruit Signup Success - Auto
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <Link
                            path={{
                                page: 'my-year-in-eve',
                                query: {
                                    videoid:
                                        'bg3b61z2us3eq1121t1j2ys1tma62921m3c1441g51r7yg',
                                },
                            }}
                        >
                            Year In EVE 21
                        </Link>
                    </li>
                )}
                {flags.isDevelopment && (
                    <li>
                        <a href="/test?gclid=gclid_test&yclid=yclid_test&utm_source=utm_source_test&utm_medium=utm_medium_test&utm_campaign=utm_campaign_test&utm_term=utm_term_test">
                            Signup Event Test
                        </a>
                    </li>
                )}
                {flags.isDevelopment && <li>TEST_VERSION 0.1.7</li>}
            </ul>
        </div>
    )

    renderLanguage = () => (
        <div className={style.language}>
            <SelectLanguage />
        </div>
    )

    renderPegi = () => (
        <div className={style.pegi}>
            <a
                id="pegi-info"
                href="http://www.pegi.info/"
                title="Visit the PEGI webpage"
            >
                <img
                    src="https://web.ccpgamescdn.com/aws/eveonline/images/pegiinfo.png"
                    width="71"
                    height="50"
                    alt="The PEGI info logo"
                />
            </a>
        </div>
    )

    renderEsrb = () => (
        <div className={style.esrb}>
            <img
                id="ESRB-rating"
                src="https://web.ccpgamescdn.com/aws/eveonline/images/esrbnotrated.png"
                alt="ESRB Rated T for violence"
                height="50"
                width="177"
            />
        </div>
    )

    renderSEOText = (seoText) => (
        <div className={style.seo}>
            <ReactMarkdown source={seoText} escapeHtml={false} />
        </div>
    )

    renderRating = () => {
        const rating = this.state.pegi ? this.renderPegi() : this.renderEsrb()
        return <div className={style.rating}>{rating}</div>
    }

    renderRequired = () => (
        <div className={`${style.row} ${style.required}`}>
            <div className={style.copyright}>
                Copyright © CCP 1997-
                {new Date().getFullYear()}
            </div>
            {this.renderRating()}
        </div>
    )

    render() {
        const language = this.props.language

        return (
            <footer className={style.footer}>
                <SectionById identifier="footer" locale={language}>
                    {(section) => {
                        let headline
                        let seoText
                        let playContent
                        let playerContent
                        let universeContent
                        let siteinfoContent

                        if (section) {
                            headline = section.headline
                            seoText = section.teaser
                            playContent = section.contentCollection.items[0]
                            playerContent = section.contentCollection.items[1]
                            universeContent = section.contentCollection.items[2]
                            siteinfoContent = section.contentCollection.items[3]
                        }
                        return (
                            <Container>
                                {this.renderSocial(headline)}
                                <div className={`${style.row} ${style.below}`}>
                                    {this.renderLanguage()}
                                    {this.renderColumn(playContent)}
                                    {this.renderColumn(playerContent)}
                                    {this.renderColumn(universeContent)}
                                    {this.renderColumn(siteinfoContent)}
                                    {flags.isDevelopment &&
                                        this.renderDevLinks()}
                                </div>
                                {this.renderSEOText(seoText)}
                                {this.renderRequired()}
                                {!isProduction && (
                                    <div>
                                        <div className={style.dark}>
                                            DEV PROPERTIES
                                        </div>
                                        <div className={style.dark}>
                                            env: {environment}
                                        </div>
                                        <div className={style.dark}>
                                            contentful preview:{' '}
                                            {contentful.preview
                                                ? 'true'
                                                : 'false'}
                                        </div>
                                        <div className={style.dark}>
                                            Backend slice: {slices.backend}
                                        </div>
                                        <div className={style.dark}>
                                            Build slice: {slices.build}
                                        </div>
                                        <div className={style.dark}>
                                            Content slice: {slices.content}
                                        </div>
                                        <div className={style.dark}>
                                            signup api:{' '}
                                            {signupServiceUrl}
                                        </div>
                                        <div className={style.dark}>
                                            recruitment api:{' '}
                                            {recruitmentServiceUrl}
                                        </div>
                                        <div className={style.dark}>
                                            sentry url: {sentryDsn}
                                        </div>
                                        <div className={style.dark}>
                                            serverless runtime: nodejs14.x
                                        </div>
                                        <div className={style.dark}>
                                            serverless version: 2.57.0
                                        </div>
                                        <div className={style.dark}>
                                            sentry/cli version: 1.68.0
                                        </div>
                                        <div className={style.dark}>
                                            REACT_APP_TEST_VARIABLE:{' '}
                                            {testVariable}
                                        </div>
                                        <div className={style.dark}>
                                            version: {version}
                                        </div>
                                        <div className={style.dark}>
                                            commit id:{' '}
                                            {process.env.REACT_APP_COMMIT}
                                        </div>
                                        {process.env.REACT_APP_SHOW_ALL_SETTINGS === '1' ? (
                                        <div className={style.dark}>
                                            <pre>
                                                {JSON.stringify(config, null, 2)}
                                            </pre>
                                        </div>
                                        ): '' }
                                    </div>
                                )}
                            </Container>
                        )
                    }}
                </SectionById>
            </footer>
        )
    }
}

Footer.propTypes = {
    language: PropTypes.string,
}

export default Footer
