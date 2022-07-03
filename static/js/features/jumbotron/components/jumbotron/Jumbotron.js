import React from 'react'
import PropTypes from 'prop-types'
import { Translate } from 'react-localize-redux'
import { Section, Container, BackgroundVideo, Visibility } from 'layouts'
import style from './Jumbotron.scss'
import CTA from '../cta'
import MediaQuotes from '../media-quotes'

// import videoHeader from '../../../../static/img/eve_invasion_header_new.webm'

const Jumbotron = ({ headline, body, cta, ctaID, quote, imageFile }) => (
    <div
        className={style.jumbotron}
        //   style={{ backgroundImage: `url(${invasionbg})` }}
    >
        <BackgroundVideo
            //   mp4="https://web.ccpgamescdn.com/aws/eveonline/videos/www-header-video.mp4"
            webm="https://web.ccpgamescdn.com/aws/eveonline/videos/eve_invasion_header_new.webm"
            fill
        />
        <Section className={style.jumbosection}>
            <Container className={style.jumbocontainer}>
                <div className={style.content}>
                    <div className={style.text}>
                        <h1>
                            <Translate id="common.invasionHeadline">
                                The #1 space MMO
                            </Translate>
                        </h1>
                        <h2>
                            <Translate id="common.invasionTagline">
                                New expansion out now
                            </Translate>
                        </h2>
                        {/* <h1>{invHeadline}</h1> */}
                        {/* <h2>{invSubHeadline}</h2> */}
                    </div>
                    <Visibility direction="fadeUp" transitionDelay="0.5s">
                        <CTA section={cta} ctaID={ctaID} />
                    </Visibility>
                </div>
            </Container>
            <div className={style.fade}>
                <MediaQuotes className={style.quotes} quote={quote} />
            </div>
        </Section>
    </div>
)

Jumbotron.propTypes = {
    headline: PropTypes.string,
    body: PropTypes.string,
    imageFile: PropTypes.string,
    // videoId: PropTypes.string,
    cta: PropTypes.shape({
        body: PropTypes.string,
        content: PropTypes.array,
        headline: PropTypes.string,
    }),
    ctaID: PropTypes.string,
    quote: PropTypes.shape({
        body: PropTypes.string,
        image: PropTypes.string,
        imageFile: PropTypes.string,
        name: PropTypes.string,
    }),
}

export default Jumbotron
