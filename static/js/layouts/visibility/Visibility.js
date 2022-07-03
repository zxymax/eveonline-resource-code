import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VisibilitySensor from 'react-visibility-sensor'
import classnames from 'classnames'
import style from './Visibility.scss'

class Visibility extends Component {
    state = {
        isVisible: false,
    }

    handleChange = (isVisible) => {
        if (isVisible) {
            this.setState({ isVisible: true })
        }
    }

    render() {
        const { children, direction, className, transitionDelay } = this.props
        const { isVisible } = this.state

        const delayStyle = {
            transitionDelay,
        }

        return (
            <VisibilitySensor
                onChange={this.handleChange}
                offset={{ top: 30 }}
                partialVisibility
                active={!isVisible}
            >
                <div
                    className={classnames(
                        style.visibility,
                        style[direction],
                        isVisible ? style.isVisible : style.inVisible,
                        className
                    )}
                    style={delayStyle}
                >
                    {children}
                </div>
            </VisibilitySensor>
        )
    }
}

Visibility.propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.string,
    transitionDelay: PropTypes.string,
    className: PropTypes.string,
}

Visibility.defaultProps = {
    direction: 'fadeUp',
    className: null,
    transitionDelay: '0.25s',
}

export default Visibility
