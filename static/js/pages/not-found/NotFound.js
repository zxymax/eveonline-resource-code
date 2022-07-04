import React from 'react'
// import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Translate } from 'react-localize-redux'
import { Container, Row, Column, Icon } from 'layouts'
import style from './NotFound.scss'

const NotFound = () => {
    // const language = useSelector((state) => state.language)
    // console.log('language in not found: ', language)
    return (
        <div className={style.error}>
            <Translate>
                {({ translate }) => (
                    <Container>
                        <Row>
                            <Column xs={12}>
                                <h2>
                                    404 -{' '}
                                    {translate('errorPages.notFoundTitle')}
                                </h2>
                                <h3>M-404</h3>
                            </Column>
                        </Row>
                        <Row>
                            <Column md={8} xs={12}>
                                <p className={style.also}>
                                    {translate(
                                        'errorPages.notFoundDescription'
                                    )}
                                </p>
                            </Column>
                        </Row>
                        <ReactMarkdown
                            source={translate('errorPages.notFoundTextAndLink')}
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
                                    {translate(
                                        'errorPages.linkAccountManagement'
                                    )}
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
}
export default NotFound
