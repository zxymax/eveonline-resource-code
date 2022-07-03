import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MailCheck from 'mailcheck'
import classNames from 'classnames/bind'
import { CSSTransition } from 'react-transition-group'
import { flags } from 'config'
import { pushMailcheckSuggestionToDataLayer } from 'utils/analytics/datalayer/dataLayerFunctions'
import mailcheckDomains from './mailcheck-domains'
import ErrorMsg from '../ErrorMsg'
import style from './Input2.scss'

function Input3(props) {
    const [isFocused, setFocus] = useState(false)
    const [suggest, setSuggest] = useState(null)

    const {
        labelText,
        className,
        isServerValidated,
        isFormDirty,
        field,
        setFieldValue,
        setFieldError,
        form: { touched, errors },
        ...rest
    } = props

    const cx = classNames.bind(style)

    rest.className = style(style.input, className, {
        // dark,
        // hasError,
    })

    const showErrorMessage = !!(touched[field.name] && errors[field.name])

    const showSuccess =
        isFormDirty &&
        touched[field.name] &&
        !errors[field.name] &&
        !Object.prototype.hasOwnProperty.call(errors, field.name) &&
        isServerValidated

    const checkMark = (
        <CSSTransition
            in={showSuccess}
            timeout={2000}
            classNames={{
                enter: style.msgEnter,
                enterActive: style.msgEnterActive,
                exit: style.msgExit,
                exitActive: style.msgExitActive,
            }}
            unmountOnExit
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14.8505 0.429024L4.72811 13.7978L1.1495 9.07148C0.980102 8.84775 0.705438 8.84775 0.536006 9.07148L0.127047 9.6116C-0.0423491 9.83532 -0.0423491 10.1981 0.127047 10.4218L4.42139 16.0934C4.59078 16.3172 4.86545 16.3172 5.03488 16.0934L15.873 1.77944C16.0424 1.55571 16.0424 1.19296 15.873 0.969189L15.464 0.429024C15.2946 0.205299 15.0199 0.205299 14.8505 0.429024Z"
                    fill="#3C9529"
                />
            </svg>
        </CSSTransition>
    )

    const inputWrapperClass = cx(style.inputWrapper, {
        [style.disabled]: field.disabled,
        [style.error]: showErrorMessage,
        [style.focused]: isFocused || field.value,
    })

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = (e) => {
        field.onBlur(e)

        if (!e.target.value) {
            setFocus(false)
        }

        // mailcheck
        if (flags.features.mailcheck) {
            if (props.type === 'email' && field.value) {
                MailCheck.run({
                    email: field.value,
                    suggested: (suggestion) => {
                        setSuggest(suggestion.full)
                    },
                    empty: () => {
                        setSuggest(null)
                    },
                })
            } else {
                setSuggest(null)
            }
        }
    }

    const handleChange = (e) => {
        field.onChange(e)

        if (touched[field.name] && errors[field.name]) {
            setFieldError(field.name, '')
        }
    }

    const handleSuggest = () => {
        pushMailcheckSuggestionToDataLayer()
        setFieldValue('email', suggest, true)
        setSuggest(null)
    }

    if (flags.features.mailcheck && props.type === 'email') {
        MailCheck.defaultDomains.push(...mailcheckDomains.defaultDomains)
        MailCheck.defaultSecondLevelDomains.push(
            ...mailcheckDomains.defaultSecondLevelDomains
        )
        MailCheck.defaultTopLevelDomains.push(
            ...mailcheckDomains.defaultTopLevelDomains
        )
    }

    return (
        <>
            <div className={inputWrapperClass}>
                <label
                    className={cx(
                        style.label,
                        touched[field.name] && errors[field.name]
                            ? style.error
                            : ''
                    )}
                >
                    <span className={style.label__text}>
                        {labelText} {checkMark}
                    </span>

                    <input
                        name={field.name}
                        value={field.value}
                        type="text"
                        data-id={`signup-${labelText}`}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChange}
                        {...rest}
                    />
                    <div className={style.border} />
                </label>
            </div>
            {suggest && (
                <div className={style.mailcheck}>
                    Did you mean{' '}
                    <span role="presentation" onClick={handleSuggest}>
                        <strong>{suggest}</strong> ?
                    </span>
                </div>
            )}
            <div className={style(style.err, style[`err-${field.name}`])}>
                <ErrorMsg
                    show={showErrorMessage}
                    message={errors[field.name]}
                />
            </div>
        </>
    )
}

export default Input3

Input3.propTypes = {
    labelText: PropTypes.string,
    isServerValidated: PropTypes.bool,
    name: PropTypes.string,
    field: PropTypes.any, // eslint-disable-line
    maxLength: PropTypes.string,
    autoComplete: PropTypes.string,
    className: PropTypes.string,
}
