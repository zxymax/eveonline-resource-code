import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Visibility from 'react-visibility-sensor'
import style from './AnimatedText.scss'

class AnimatedText extends Component {
    state = {
        isVisible: false,
    }

    handleChange = (isVisible) => {
        if (isVisible) {
            this.setState({ isVisible: true })
        }
    }

    renderContent = (children, fw, delay) =>
        children.split('\n').map((text, i) => (
            <span key={text} className={style.outer}>
                <span
                    className={style(style.inner, {
                        [style.visible]: this.state.isVisible,
                        [style.fw]: fw && i !== 0,
                    })}
                    style={delay && { transitionDelay: delay }}
                >
                    {text}
                </span>
            </span>
        ))

    render() {
        const { children, fontWeightDiff, delay } = this.props

        if (!children) return null

        return (
            <Visibility
                onChange={this.handleChange}
                active={!this.state.isVisible}
                delayedCall
                intervalDelay={200}
            >
                <>{this.renderContent(children, fontWeightDiff, delay)}</>
            </Visibility>
        )
    }
}

AnimatedText.propTypes = {
    children: PropTypes.node,
    fontWeightDiff: PropTypes.bool,
    delay: PropTypes.string,
}

AnimatedText.defaultProps = {
    fontWeightDiff: false,
}

export default AnimatedText

