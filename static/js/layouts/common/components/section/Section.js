import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'
import classNames from 'classnames'
import style from './Section.scss'

const Section = ({
    children,
    hasContent = true,
    loadingTypeSmall,
    spinnerSize = 20,
    className,
}) => {
    // console.log('minHeight = ', minHeight)
    // const heightPadding = minHeight / 2
    // const loadingStyles = {
    //     minHeight: `${minHeight}px`,
    //     paddingTop: `${heightPadding}px`,
    // }

    // const sectionClass = classNames(s.sectionLoading, { [s.small]: loadingTypeSmall })
    // const sectionClass = classNames({s.sectionLoadingSmall , loadingTypeSmall)
    const sectionClass = classNames(
        style({
            sectionLoadingSmall: loadingTypeSmall,
            sectionLoading: !loadingTypeSmall,
        })
    )

    return (
        <>
            {hasContent ? (
                <section className={style(style.section, className)}>
                    {children}
                </section>
            ) : (
                <section className={sectionClass}>
                    <div className={style.spinner}>
                        <PulseLoader
                            size={spinnerSize}
                            color="#b8b8b8"
                            loading
                        />
                    </div>
                </section>
            )}
        </>
    )
}

Section.propTypes = {
    children: PropTypes.node,
    hasContent: PropTypes.bool,
    loadingTypeSmall: PropTypes.bool,
    className: PropTypes.string,
    // minHeight: PropTypes.number,
    spinnerSize: PropTypes.number,
}

export default Section

