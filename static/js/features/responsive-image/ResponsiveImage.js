import React from 'react'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import { isClient } from 'config/web'

const ResponsiveImage = (props) => {
    let { imgSize, alt } = props
    const { url, className } = props

    const original = '_fm=jpg&fl=progressive'
    const large = '_w=1920&fm=jpg&fl=progressive'
    const medium = '_w=1280&fm=jpg&fl=progressive'
    const small = '_w=640&fm=jpg&fl=progressive'
    const smallest = '_w=360&fm=jpg&fl=progressive'

    imgSize = original
    alt = ' '

    let w = 1921
    if (isClient) {
        w = window.innerWidth
    }

    if (w > 1920) {
        imgSize = original
    } else if (w > 1280) {
        imgSize = large
    } else if (w > 640) {
        imgSize = medium
    } else if (w > 360) {
        imgSize = small
    } else {
        imgSize = smallest
    }

    // if (url.contains('newssystem')) {
    //     imgSize = ''
    // }

    return (
        <LazyLoad height={200} offset={200}>
            <img className={className} src={`${url}${imgSize}`} alt={alt} />
        </LazyLoad>
    )
}

ResponsiveImage.propTypes = {
    url: PropTypes.string,
    imgSize: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
}

export default ResponsiveImage
