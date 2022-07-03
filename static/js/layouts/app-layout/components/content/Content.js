import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './Content.scss'

const cx = classNames.bind(style)

const Content = ({ children, currentPage, subPage }) => {
    const mainClassname = cx('content', currentPage, subPage)

    return <main className={mainClassname}>{children}</main>
}

Content.propTypes = {
    children: PropTypes.node,
    currentPage: PropTypes.string,
    subPage: PropTypes.string,
}

export default Content

