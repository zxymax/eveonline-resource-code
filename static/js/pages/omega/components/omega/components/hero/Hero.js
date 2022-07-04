import React from 'react'
import PropTypes from 'prop-types'
import { Container, Section, SvgIcon } from 'layouts'
import ReactMarkdown from 'react-markdown'
import CTA from '../cta'

const Hero = ({ style, headline, teaser, CTASection }) => {
    return (
        <Container>
            <Section hasContent>
                <div className={style.content}>
                    <SvgIcon
                        width={165}
                        className={style.heroSvgIcon}
                        name="omega-hexagon"
                        fill="#FFCC00"
                    />
                    <div className={style.text}>
                        <ReactMarkdown source={headline} />
                        <ReactMarkdown source={teaser} />
                    </div>
                    {CTASection && <CTA content={CTASection} />}
                </div>
            </Section>
        </Container>
    )
}

Hero.propTypes = {
    style: PropTypes.func,
    headline: PropTypes.string,
    teaser: PropTypes.string,
}

Hero.defaultProps = {
    style: null,
    headline: '# UPGRADE TO OMEGA ## UNLOCK EVERYTHING IN EVE ONLINE',
    teaser:
        'Omega is the premium subscription in EVE Online. Upgrade your account today and unlock all of EVE Onlines skills, ships and content!',
}

export default Hero

