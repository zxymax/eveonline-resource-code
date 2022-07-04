import React from 'react'
import _map from 'lodash/map'
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames'
import { Column, Row, Icon } from 'layouts'
import PropTypes from 'prop-types'
import style from './Advantages.scss'

const Advantages = ({ section, visible }) => {
    const items = _map(section.contentCollection.items, (item, index) => {
        const colClass = classNames(
            style('col', visible ? 'show' : '', `order${index}`)
        )
        return (
            <Column key={index} xs={12} sm={6} md={3} className={colClass}>
                <div className={style.content}>
                    <Icon regular name={item.headline} />
                    <ReactMarkdown source={item.body} escapeHtml={false} />
                </div>
            </Column>
        )
    })

    return (
        <div className={style.advantages}>
            <Row className={style.row}>{items}</Row>
        </div>
    )
}

Advantages.propTypes = {
    // style: PropTypes.func,
    visible: PropTypes.bool,
    section: PropTypes.shape({
        name: PropTypes.string,
        headline: PropTypes.string, // we are using the headline property to determine what fontawesome icon to load
        body: PropTypes.string,
        buttonText: PropTypes.string,
        buttonUrl: PropTypes.string,
        content: PropTypes.arrayOf(PropTypes.object),
    }),
}

export default Advantages

