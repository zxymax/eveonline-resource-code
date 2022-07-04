import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import Card from '../card'
import style from './Mural.scss'
import { Container, Row } from '../../../../layouts'

class Mural extends Component {
    state = {
        muralHeight: 0,
    }

    shouldComponentUpdate() {
        if (this.state.firstRender === undefined) {
            this.setState({ firstRender: false })
            return true
        }
        return false
    }

    renderCards = (items, colorSet) => {
        const cardsPerRow = 3
        const columnHeight = [0, 0, 0]
        return _map(items, (item, i) => {
            let backgroundProperties = null
            const columnStartCollection = []
            let columnStart = 0
            columnStartCollection[0] = 230
            columnStartCollection[1] = 300
            columnStartCollection[2] = 100
            if (i < 3) {
                columnStart = columnStartCollection[i]
            }
            const height = 350 + Math.floor(Math.random() * 250)
            if (item.imageFile === undefined) {
                backgroundProperties =
                    colorSet[Math.floor(Math.random() * colorSet.length)]
            }
            const inlineStyle = {
                // eslint-disable-line
                height: `${height}px`,
                background: backgroundProperties,
                top:
                    columnHeight[i % cardsPerRow] +
                    i / cardsPerRow +
                    columnStart,
                left: `${(i % cardsPerRow) * 33.33}%`,
                marginTop: 30 * Math.floor(i / 3),
            }

            columnHeight[i % cardsPerRow] += height + columnStart
            this.setState({ muralHeight: Math.max(...columnHeight) + 100 })

            return <Card key={i} card={item} inlineStyle={inlineStyle} />
        })
    }

    render() {
        const { section } = this.props
        const colorSet = []
        if (section.colorInfo) {
            _map(section.colorInfo, (value, key) => {
                if (value > 1) {
                    colorSet.push({ background: `#${key}`, opacity: 0.8 })
                }
            })
        }

        return (
            <Container wide={section.wide}>
                <div
                    className={style.mural}
                    style={{ height: this.state.muralHeight }}
                >
                    <Row>{this.renderCards(section.content, colorSet)}</Row>
                </div>
            </Container>
        )
    }
}

Mural.propTypes = {
    section: PropTypes.shape({
        colorInfo: PropTypes.objectOf(PropTypes.number),
        content: PropTypes.arrayOf(PropTypes.object),
        wide: PropTypes.bool,
    }),
}

export default Mural
