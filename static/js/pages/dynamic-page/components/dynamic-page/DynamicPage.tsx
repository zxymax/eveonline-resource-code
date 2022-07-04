import React, { useEffect, CSSProperties } from 'react'
import _map from 'lodash/map'
import { scroller } from 'react-scroll'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { getLocationPayload } from 'lib/location/selectors'
import PageLocationType from 'models/page-location-type'
import SectionType from 'models/types/ts/sectionType'
import DlpThemeType from 'models/types/ts/dlpThemeType'
import { isClient } from 'config/web'
import { Section } from 'layouts'
import BackgroundImage from 'features/background-image'
import ComponentFactory from '../componentFactory'
import { ThemeContext, LocationContext } from '../../context'
import { lightOrDark } from '../../helpers'
import defaultTheme from '../../defaultTheme'
import s from './DynamicPage.module.scss'

interface Props {
    sections: {
        [index: number]: SectionType
    }
    pageBackground: {
        url: string
    }
    config: DlpThemeType
}

const DynamicPage = ({
    sections,
    pageBackground,
    config,
}: Props): JSX.Element => {
    const location: PageLocationType = useSelector((state) =>
        getLocationPayload(state)
    )
    // create theme config with fallback values
    const themeConfig = { ...defaultTheme, ...config }

    useEffect(() => {
        if (isClient) {
            // Scroll to section if URL includes hashed section id
            const hash = window.location.hash.substring(1)
            if (hash) {
                // Set timeout because of dynamic content
                setTimeout(() => {
                    scroller.scrollTo(hash, {
                        duration: 500,
                        smooth: true,
                        isDynamic: true,
                        delay: 200,
                    })
                }, 600)
            }
        }
    }, [])

    const renderPageBackground = (): JSX.Element => {
        if (themeConfig.legacy) {
            return (
                <div
                    className={cx(s.bg, s.fluid)}
                    style={{
                        backgroundImage: `url(${pageBackground?.url})`,
                    }}
                />
            )
        }

        return (
            <BackgroundImage
                className={cx(s.bg, s.default)}
                url={pageBackground.url}
                size="cover"
                repeat="no repeat"
                position="50% 50%"
            />
        )
    }

    const colorVariables = {
        '--dlp-card-bg': themeConfig.cardTemplate,
        '--dlp-headline-color': themeConfig.headline,
        '--dlp-cta-card-bg': themeConfig.ctaCardTemplate,
        '--dlp-cta-card-color': lightOrDark(themeConfig.ctaCardTemplate),
        '--dlp-cta-color': themeConfig.CTA.color,
        '--dlp-cta-bg': themeConfig.CTA.background,
        '--dlp-link-color': themeConfig.link,
    } as CSSProperties

    return (
        <div className={s.page} style={colorVariables}>
            {renderPageBackground()}
            {_map(sections, (section, i) => (
                <Section key={i} className={s.dynamic_section}>
                    <ThemeContext.Provider value={themeConfig}>
                        <LocationContext.Provider value={location}>
                            <ComponentFactory
                                data={section}
                                key={i}
                                themeConfig={themeConfig}
                            />
                        </LocationContext.Provider>
                    </ThemeContext.Provider>
                </Section>
            ))}
        </div>
    )
}

export default DynamicPage
