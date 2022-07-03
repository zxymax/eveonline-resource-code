import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'layouts/font-awesome'

const NextArrow = (props) => {
    const { onClick, className } = props
    return (
        <div role="presentation" className={className} onClick={onClick}>
            <Icon name="chevron-right" />
        </div>
    )
}

export default NextArrow

NextArrow.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
}

