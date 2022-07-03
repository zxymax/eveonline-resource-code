import React from 'react'
import ReactMarkdown from 'react-markdown'
import style from './Upgrade.scss'
import { propTypes, defaultProps } from './props'
import { Column, Row, Button } from '../../../layouts'

const Upgrade = (props) => {
    const { headline, body, teaser, img, buttonText } = props

    return (
        <div className={style.upgrade}>
            <Row className={style.row}>
                <Column sm={12} md={2} className={style.image}>
                    <img src={img} alt="" />
                </Column>
                <Column sm={12} md={6} className={style.text}>
                    <ReactMarkdown source={headline} />
                    <ReactMarkdown source={body} />
                </Column>
                <Column xs={12} md={4} className={style.btn}>
                    <Button
                        internal
                        theme="omega"
                        size="large"
                        path={{ page: 'omega' }}
                        title={`Omega - ${buttonText}`}
                    >
                        {buttonText}
                    </Button>
                    <p className={style.omega}>{teaser}</p>
                </Column>
            </Row>
        </div>
    )
}

Upgrade.propTypes = propTypes
Upgrade.defaultProps = defaultProps

export default Upgrade

