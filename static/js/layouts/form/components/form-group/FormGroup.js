import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import style from './FormGroup.scss'

class FormGroup extends Component {
    constructor(props) {
        super(props)

        this.updateChildren = this.updateChildren.bind(this)
    }

    updateChildren(child) {
        const className = style(child.props.className, {
            hasError: this.props.hasError,
        })

        return cloneElement(child, { className })
    }

    render() {
        const {
            label,
            errorMessage,
            hasError,
            className,
            children,
            ...rest
        } = this.props

        rest.className = style('form-group', className, {
            hasError,
        })

        return (
            <div className={rest.className}>
                {Children.map(children, (child) => this.updateChildren(child))}
            </div>
        )
    }
}

export default FormGroup

FormGroup.propTypes = {
    label: PropTypes.string,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    className: PropTypes.string,
}
