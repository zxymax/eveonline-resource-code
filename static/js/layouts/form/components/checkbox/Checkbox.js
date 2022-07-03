import React from 'react'
import PropTypes from 'prop-types'
import ErrorMsg from '../ErrorMsg'
import style from './checkbox.scss'

function Checkbox(props) {
    const {
        children,
        labelText,
        className,
        field,
        form: { touched, errors },
        ...rest
    } = props

    rest.className = style(style.input, className, {
        // hasError,
    })

    const showErrorMessage = !!(touched[field.name] && errors[field.name])

    return (
        <div className={style.container}>
            <label className={style.label}>
                {labelText}
                <input type="checkbox" {...field} {...rest} />
                <span className={style.checkmark}>
                    <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 5.33333L5.33333 8.66667L12 2"
                            stroke="white"
                            strokeWidth="2"
                            strokeMiterlimit="10"
                            strokeLinecap="square"
                        />
                    </svg>
                </span>
            </label>
            {children}

            {/* {showErrorMessage && ( */}
            <ErrorMsg show={showErrorMessage} message={errors[field.name]} />
            {/* )} */}
        </div>
    )
}

export default Checkbox

Checkbox.propTypes = {
    hasError: PropTypes.bool,
    errorText: PropTypes.string,
    label: PropTypes.string,
    field: PropTypes.any, // eslint-disable-line
    title: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    autoComplete: PropTypes.string,
    className: PropTypes.string,
}
