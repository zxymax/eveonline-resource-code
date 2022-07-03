import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'layouts/font-awesome'

const PrevArrow = (props) => {
    const { onClick, className } = props
    return (
        <div role="presentation" className={className} onClick={onClick}>
            <Icon name="chevron-left" />
        </div>
    )
}

export default PrevArrow

PrevArrow.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
}

