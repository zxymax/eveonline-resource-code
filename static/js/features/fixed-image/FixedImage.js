import React from 'react'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'

const FixedImage = (props) => {
    const { url, className, size, alt, height, offset, once } = props

    const original = '_fm=jpg&fl=progressive'
    const large = '_w=1920&fm=jpg&fl=progressive'
    const medium = '_w=1280&fm=jpg&fl=progressive'
    const mediumSmall = '_w=900&fm=jpg&fl=progressive'
    const small = '_w=640&fm=jpg&fl=progressive'
    const smallest = '_w=360&fm=jpg&fl=progressive'

    let postfix = ''

    switch (size) {
        case 'original':
            postfix = original
            break
        case 'large':
            postfix = large
            break
        case 'medium':
            postfix = medium
            break
        case 'mediumSmall':
            postfix = mediumSmall
            break
        case 'small':
            postfix = small
            break
        case 'smallest':
            postfix = smallest
            break
        default:
            postfix = medium
    }

    return (
        <LazyLoad height={height} offset={offset} once={once}>
            <img className={className} src={`${url}${postfix}`} alt={alt} />
        </LazyLoad>
    )
}

FixedImage.propTypes = {
    url: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.string,
    alt: PropTypes.string,
    height: PropTypes.number,
    offset: PropTypes.number,
    once: PropTypes.bool,
}

FixedImage.defaultProps = {
    alt: '',
    height: 200,
    offset: 200,
    once: true,
}

export default FixedImage
