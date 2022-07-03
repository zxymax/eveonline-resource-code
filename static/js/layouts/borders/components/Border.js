import React from 'react'
import PropTypes from 'prop-types'
import style from './Border.scss'

function Border(props) {
    const {
        primary,
        secondary,
        dark,
        small,
        clean,
        transparent,
        reversed,
        centered,
        className,
        ...rest
    } = props

    // console.log('Border is rendering!', primary, secondary)

    rest.className = style('border', className, {
        primary,
        secondary,
        dark,
        small,
        clean,
        transparent,
        reversed,
    })

    return (
        <div {...rest}>
            <div className={style(style.inner, { reversed, centered })} />
        </div>
    )
}

export default Border

Border.propTypes = {
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    dark: PropTypes.bool,
    small: PropTypes.bool,
    clean: PropTypes.bool,
    reversed: PropTypes.bool,
    centered: PropTypes.bool,
    transparent: PropTypes.bool,
    className: PropTypes.string,
}

