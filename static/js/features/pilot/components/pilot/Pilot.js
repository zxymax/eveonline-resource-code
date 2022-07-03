import React from 'react'
import _includes from 'lodash/includes'
import ReactMarkdown from 'react-markdown'
import Upgrade from 'features/upgrade'
import { Section, Container, Column, Row, Border, Button } from 'layouts'
import { propTypes, defaultProps } from './props'
import style from './Pilot.scss'

const Pilot = ({
    headline,
    body,
    backgroundImage,
    buttonText,
    buttonUrl,
    upgrade,
}) => {
    const bgImgStyle = {
        backgroundImage: `url(${backgroundImage})`,
    }

    const btn = !_includes(buttonUrl, 'https') ? (
        <Button internal path={{ page: 'player-resources' }}>
            {buttonText}
        </Button>
    ) : (
        <Button path={buttonUrl}>{buttonText}</Button>
    )

    return (
        <div className={style.pilot} style={bgImgStyle}>
            <Section>
                <div className={style.gradient}>
                    <img
                        src="//web.ccpgamescdn.com/aws/eveonline/images/bg-stars-2.png"
                        alt=""
                    />
                </div>
                <Container>
                    <Row className={style.row}>
                        <Column md={6} sm={6} xs={12}>
                            <ReactMarkdown source={headline} />
                            <Border primary />
                            <ReactMarkdown source={body} />
                            {buttonText != null && (
                                <div className={style.btn}>{btn}</div>
                            )}
                        </Column>
                    </Row>
                    <Upgrade section={upgrade} />
                </Container>
            </Section>
        </div>
    )
}

Pilot.propTypes = propTypes
Pilot.defaultProps = defaultProps

export default Pilot

