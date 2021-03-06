import isObject from 'lodash/isObject'
import React from 'react'
import PropTypes from 'prop-types'
import style from './Column.scss'

const colWidths = ['xs', 'sm', 'md', 'lg', 'xl']
const stringOrNumberProp = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
])

const columnProps = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
        size: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ]),
        push: stringOrNumberProp,
        pull: stringOrNumberProp,
        offset: stringOrNumberProp,
    }),
])

const propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    xl: columnProps,
    className: PropTypes.string,
    cssModule: PropTypes.object, // eslint-disable-line 
    widths: PropTypes.array, // eslint-disable-line 
    children: PropTypes.node
}

const defaultProps = {
    tag: 'div',
    widths: colWidths,
}

const getColumnSizeClass = (isXs, colWidth, colSize) => {
    if (colSize === true || colSize === '') {
        return isXs ? 'col' : `col-${colWidth}`
    }
    if (colSize === 'auto') {
        return isXs ? 'col-auto' : `col-${colWidth}-auto`
    }

    return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`
}

const Column = (props) => {
    const { className, cssModule, widths, tag: Tag, ...attributes } = props
    const colClasses = []

    widths.forEach((colWidth, i) => {
        let columnProp = props[colWidth]

        if (!i && columnProp === undefined) {
            columnProp = true
        }

        delete attributes[colWidth]

        if (!columnProp && columnProp !== '') {
            return
        }

        const isXs = !i
        let colClass

        if (isObject(columnProp)) {
            const colSizeInterfix = isXs ? '-' : `-${colWidth}-`
            colClass = getColumnSizeClass(isXs, colWidth, columnProp.size)

            colClasses.push(
                style({
                    [colClass]: columnProp.size || columnProp.size === '',
                    [`push${colSizeInterfix}${columnProp.push}`]:
                        columnProp.push || columnProp.push === 0,
                    [`pull${colSizeInterfix}${columnProp.pull}`]:
                        columnProp.pull || columnProp.pull === 0,
                    [`offset${colSizeInterfix}${columnProp.offset}`]:
                        columnProp.offset || columnProp.offset === 0,
                }),
                cssModule
            )
        } else {
            colClass = getColumnSizeClass(isXs, colWidth, columnProp)
            colClasses.push(colClass)
        }
    })
    const classes = style(className, colClasses)

    return <Tag {...attributes} className={classes} />
}

Column.propTypes = propTypes
Column.defaultProps = defaultProps

export default Column

