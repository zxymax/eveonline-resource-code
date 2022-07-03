import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import { HeadingSmall, HeadingRegular } from 'layouts/typography'
import style from './Heading.scss'

class Heading extends Component {
    state = {
        isVisible: false,
    }

    handleChange = (isVisible) => {
        if (isVisible) {
            this.setState({ isVisible: true })
        }
    }

    render() {
        const { isVisible } = this.state
        const { children, size, isRecruit, isThemed } = this.props
        const css = style(style.heading, style[size], {
            [style.recruit]: isRecruit,
            [style.visible]: isVisible,
            [style.colorTheme]: isThemed,
        })
        return (
            <VisibilitySensor
                partialVisibility
                onChange={this.handleChange}
                active={!isVisible}
            >
                {size === 'small' ? (
                    <HeadingSmall className={css}>
                        <span>{children}</span>
                    </HeadingSmall>
                ) : (
                    <HeadingRegular className={css}>
                        <span>{children}</span>
                    </HeadingRegular>
                )}
            </VisibilitySensor>
        )
    }
}

Heading.propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'regular', 'large']),
    isRecruit: PropTypes.bool,
    isThemed: PropTypes.bool,
}

Heading.defaultProps = {
    size: 'large',
    isRecruit: false,
    isThemed: false,
}

export default Heading
