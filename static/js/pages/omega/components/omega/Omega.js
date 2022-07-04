import React, { Component } from 'react'
import Visibility from 'react-visibility-sensor'
import LazyLoad from 'react-lazyload'
import { Container, Section } from 'layouts'
import { FeatureVideo } from 'features'
import { propTypes, defaultProps } from './props'
import Advantages from './components/advantages'
import ComparisonSection from './components/comparison'
import HeroSection from './components/hero'
import QuotesSection from './components/quotes'
import style from './Omega.module.scss'

class Omega2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleClass: '',
            visible: false,
        }
    }

    onChange = (isVisible) => {
        if (isVisible) {
            this.setState({ visible: true })
        }
    }

    render() {
        const {
            Hero,
            CTA,
            Video,
            Advantage,
            Quotes,
            MediaQuotes,
            Comparison,
            hasContent,
        } = this.props

        return (
            <div className={style.omega}>
                <div className={style.advantagesDeco} />

                <div className={style.hero}>
                    {Hero && (
                        <Section hasContent={hasContent}>
                            <HeroSection
                                style={style}
                                headline={Hero.headline}
                                teaser={Hero.teaser}
                                buttonText={Hero.buttonText}
                                buttonUrl={Hero.buttonUrl}
                                CTASection={CTA.contentCollection}
                            />
                        </Section>
                    )}
                </div>

                <Container>
                    {Video && (
                        <FeatureVideo
                            //   style={style}
                            image={Video.imageFile.url}
                            videoId={Video.videoId}
                        />
                    )}
                    {Advantage && (
                        <Visibility
                            onChange={this.onChange}
                            offset={{ top: 30 }}
                            partialVisibility
                        >
                            <Advantages
                                visible={this.state.visible}
                                section={Advantage}
                            />
                        </Visibility>
                    )}
                </Container>

                {Comparison && MediaQuotes && (
                    <ComparisonSection
                        section={Comparison}
                        mediaQuotesSection={MediaQuotes}
                        CTASection={CTA.contentCollection}
                    />
                )}

                {Quotes && <QuotesSection section={Quotes} />}
            </div>
        )
    }
}

Omega2.propTypes = propTypes
Omega2.defaultProps = defaultProps

export default Omega2
