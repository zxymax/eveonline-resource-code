import React, { Fragment } from 'react'
import { detect } from 'detect-browser'
import { Container, Icon } from 'layouts'
import style from './style.scss'

const IEWarning = () => {
    const browser = detect()
    const showWarning = browser && browser.name === 'ie'
    return (
        <div>
            {showWarning && (
                <div className={style.warning}>
                    <Container className={style.container}>
                        <div className={style.icon}>
                            <Icon fixedWidth name="exclamation-triangle" />
                        </div>
                        <div className={style.content}>
                            <h3>
                                Please note that www.eveonline.com no longer
                                supports Internet Explorer browser.
                            </h3>
                            <p>
                                We <b>strongly</b> recommend you update your
                                browser for more security, speed and the best
                                experience on this site.
                            </p>
                        </div>
                    </Container>
                </div>
            )}
        </div>
    )
}

export default IEWarning
