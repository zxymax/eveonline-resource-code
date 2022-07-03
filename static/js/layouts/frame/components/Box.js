import React from 'react'
import PropTypes from 'prop-types'
import Border from './Border'
import Fills from './Fills'
import Content from './Content'
import styles from '../Frame.scss'

class Box extends React.PureComponent {
    renderBorder = () => {
        if (!this.props.border) {
            return null
        }

        const {
            borderClass,
            large,
            medium,
            small,
            borderTop,
            borderBottom,
            borderTopFill,
            borderBottomFill,
        } = this.props
        const borderProps = {
            className: borderClass,
            large,
            medium,
            small,
            cutTop: borderTop,
            cutBottom: borderBottom,
            fillTop: borderTopFill,
            fillBottom: borderBottomFill,
        }

        return <Border {...borderProps} />
    }

    renderFills = () => {
        const {
            fillClass,
            fillTop,
            fillBottom,
            large,
            medium,
            small,
            border,
        } = this.props
        const cutProps = {
            className: fillClass,
            top: fillTop,
            bottom: fillBottom,
            large,
            medium,
            small,
            offset: border,
        }
        return <Fills {...cutProps} />
    }

    renderContent = () => {
        const {
            children,
            large,
            medium,
            small,
            border,
            className,
            cutoutTop,
            cutoutBottom,
            cutCorner,
        } = this.props
        const contentProps = {
            className,
            top: cutoutTop,
            bottom: cutoutBottom,
            large,
            medium,
            small,
            offset: border,
            corner: cutCorner,
        }
        return <Content {...contentProps}>{children}</Content>
    }

    render () {
        return (
            <div className={styles('box', this.props.boxClass)}>
                {this.renderBorder()}
                {this.renderContent()}
                {this.renderFills()}
            </div>
        )
    }
}

Box.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    borderClass: PropTypes.string,
    fillClass: PropTypes.string,
    boxClass: PropTypes.string,
    border: PropTypes.bool,
    large: PropTypes.bool,
    medium: PropTypes.bool,
    small: PropTypes.bool,
    fillTop: PropTypes.bool,
    fillBottom: PropTypes.bool,
    cutoutTop: PropTypes.bool,
    cutoutBottom: PropTypes.bool,
    cutCurner: PropTypes.bool,
    borderTop: PropTypes.bool,
    borderBottom: PropTypes.bool,
    borderTopFill: PropTypes.bool,
    borderBottomFill: PropTypes.bool,
}

export default Box
