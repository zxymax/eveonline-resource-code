import React from 'react'
import SectionType from 'models/types/ts/sectionType'
import ReactMarkdown from 'react-markdown'
import _isEmpty from 'lodash/isEmpty'
import classNames from 'classnames'
import { Container, Frame } from 'layouts'
import CTA from 'features/jumbotron/components/cta'
import { FeatureVideo } from 'features'
import { HeadingSmall, ParagraphRegular } from 'layouts/typography'
import Signup from '../signup'
import { ThemeContext } from '../../context'
import { getImage } from '../../helpers'
import style from './Hero.module.scss'

const cx = classNames.bind(style)

interface Props {
    section: SectionType
    align: 'left' | 'center' | 'right'
}

function Hero({ section, align = 'left' }: Props): JSX.Element {
    return (
        <Container>
            <ThemeContext.Consumer>
                {(colorTheme) => (
                    <>
                        <div
                            className={cx(style.hero, style[align], {
                                [style.form]: colorTheme.signupForm,
                            })}
                        >
                            {!_isEmpty(section.imageFile) && (
                                <div className={style.logo}>
                                    <img
                                        src={getImage(section.imageFile)}
                                        alt=""
                                    />
                                </div>
                            )}
                            <div>
                                <ReactMarkdown
                                    className={style.content}
                                    source={section.body}
                                    escapeHtml={false}
                                />
                                <CTA
                                    custom={{
                                        color: colorTheme.CTA.color,
                                        background: colorTheme.CTA.background,
                                    }}
                                    section={section.contentCollection.items}
                                    data-id="dynamic-hero-cta-button"
                                    alignLeft={align !== 'center'}
                                    className={style.cta}
                                />
                                {section.videoId && section.buttonText && (
                                    <div
                                        className={style.play}
                                        style={
                                            {
                                                '--play-color': colorTheme.link,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <FeatureVideo
                                            isButton
                                            videoId={section.videoId}
                                            title={section.buttonText}
                                        />
                                    </div>
                                )}
                            </div>
                            {colorTheme.signupForm && (
                                <div
                                    className={style.signup}
                                    style={
                                        {
                                            '--form-bg':
                                                colorTheme.signupFormTheme
                                                    .background,
                                            '--form-btn':
                                                colorTheme.signupFormTheme
                                                    .color,
                                            '--sf-terms-button-color':
                                                colorTheme.signupFormTheme
                                                    .color,
                                        } as React.CSSProperties
                                    }
                                >
                                    <Frame className={style.signup_content}>
                                        {section.headline && (
                                            <HeadingSmall
                                                as="h3"
                                                className={style.signup_title}
                                                style={{
                                                    color:
                                                        colorTheme
                                                            .signupFormTheme
                                                            .theme === 'light'
                                                            ? '#212121'
                                                            : '#fff',
                                                }}
                                            >
                                                {section.headline}
                                            </HeadingSmall>
                                        )}
                                        {section.teaser && (
                                            <ParagraphRegular
                                                className={style.signup_text}
                                                style={{
                                                    color:
                                                        colorTheme
                                                            .signupFormTheme
                                                            .text,
                                                }}
                                            >
                                                {section.teaser}
                                            </ParagraphRegular>
                                        )}
                                        <Signup />
                                    </Frame>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </ThemeContext.Consumer>
        </Container>
    )
}

export default Hero
