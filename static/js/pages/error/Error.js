import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Translate } from 'react-localize-redux'
import { Container, Column, Row, Icon } from 'layouts'
import style from 'pages/not-found/NotFound.scss'

const NotFound = () => (
    <div className={style(style.error, style.e500)}>
        <Translate>
            {({ translate }) => (
                <Container>
                    <Row>
                        <Column xs={12}>
                            <h2> 500 - {translate('errorPages.errorTitle')}</h2>
                            <h3>B-R500</h3>
                        </Column>
                    </Row>
                    <Row>
                        <Column md={8} xs={12}>
                            <p className={style.also}>
                                {translate('errorPages.errorDescription')}
                            </p>
                        </Column>
                    </Row>
                    <ReactMarkdown
                        source={translate('errorPages.errorTextAndLink')}
                    />
                    <p className={style.also}>
                        {translate('errorPages.linkToOtherLocations')}
                    </p>
                    <ul>
                        <li>
                            <Icon solid name="square" className="arrow" />{' '}
                            <a href="//www.eveonline.com/">
                                {translate('errorPages.linkFrontpage')}
                            </a>
                        </li>
                        <li>
                            <Icon solid name="square" className="arrow" />{' '}
                            <a href="//secure.eveonline.com/">
                                {translate('errorPages.linkAccountManagement')}
                            </a>
                        </li>
                        <li>
                            <Icon solid name="square" className="arrow" />{' '}
                            <a href="//forums.eveonline.com/">
                                {translate('errorPages.linkForums')}
                            </a>
                        </li>
                        <li>
                            <Icon solid name="square" className="arrow" />{' '}
                            <a href="//community.eveonline.com/">
                                {translate('errorPages.linkCommunity')}
                            </a>
                        </li>
                    </ul>
                </Container>
            )}
        </Translate>
    </div>
)

export default NotFound
