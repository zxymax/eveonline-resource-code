import React, { Component } from 'react'
import _map from 'lodash/map'
import classNames from 'classnames'
import Visibility from 'react-visibility-sensor'
import ReactMarkdown from 'react-markdown'
import { Container, Row, Column, Button, SvgIcon } from 'layouts'
import PropTypes from 'prop-types'
import MediaQuotes from '../mediaQuotes'
import CTA from '../cta'
import style from './Comparison.scss'

class Comparison extends Component {
    state = {
        showComp: false,
    }

    onChange = (isVisible) => {
        if (isVisible) {
            this.setState({ showComp: true })
        }
    }

    getSvgName = (name) => {
        const prefix = name === 'Omega' ? 'omega' : 'alpha'
        return `${prefix}-hexagon`
    }

    render() {
        const {
            section,
            mediaQuotesSection,
            CTASection,
            className,
        } = this.props
        const { buttonText, buttonUrl } = section

        // const priceFrom = priceInfo => (
        //     <div className={style.priceFrom}>
        //         <p>{priceInfo}</p>
        //     </div>
        // )

        const cols = _map(section.contentCollection.items, (item, index) => {
            const cellClass = classNames(
                style.cell,
                { [style.show]: this.state.showComp },
                { [style.omega]: item.name === 'Omega' }
            )

            return (
                <Visibility
                    key={index}
                    onChange={this.onChange}
                    offset={{ top: 10 }}
                    partialVisibility
                >
                    <Column key={index} md={6} sm={6} xs={12}>
                        <div className={cellClass}>
                            <div className={style.header}>
                                <SvgIcon
                                    width={60}
                                    name={this.getSvgName(item.name)}
                                    fill="#FFCC00"
                                />
                                <div className={style.content}>
                                    <h4>{item.name}</h4>
                                    <h5>{item.headline}</h5>
                                    {/* {item.name === 'Omega' && priceFrom(item.buttonText)} */}
                                </div>
                            </div>
                            <div className={style.body}>
                                <ReactMarkdown
                                    source={item.body}
                                    escapeHtml={false}
                                />
                            </div>
                        </div>
                    </Column>
                </Visibility>
            )
        })

        return (
            <div className={style(style.comparison, className)}>
                <Container>
                    <Row>{cols}</Row>
                    {CTASection && <CTA content={CTASection} />}
                    <Row>
                        <Column xs={12}>
                            {mediaQuotesSection && (
                                <MediaQuotes section={mediaQuotesSection} />
                            )}
                        </Column>
                    </Row>
                </Container>
            </div>
        )
    }
}

Comparison.propTypes = {
    // style: PropTypes.func,
    section: PropTypes.shape({
        name: PropTypes.string,
        body: PropTypes.string,
        buttonText: PropTypes.string,
        buttonUrl: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.object),
    }),
    mediaQuotesSection: PropTypes.shape({
        name: PropTypes.string,
        body: PropTypes.string,
        buttonText: PropTypes.string,
        buttonUrl: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.object),
    }),
    className: PropTypes.string,
}

export default Comparison

