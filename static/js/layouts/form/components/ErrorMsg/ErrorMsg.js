import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import style from './ErrorMsg.scss'

function ErrorMsg(props) {
    const { message, show = false } = props

    return (
        <>
            <CSSTransition
                in={show}
                timeout={1000}
                classNames={{
                    enter: style.msgEnter,
                    enterActive: style.msgEnterActive,
                    enterDone: style.msgEnterDone,
                    exit: style.msgExit,
                    exitActive: style.msgExitActive,
                }}
                unmountOnExit
            >
                <div className={style.invalidFeedback}>
                    {/* <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7 4V9H9V4H7ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
                          fill="#f44336"
                        />
                    </svg> */}
                    <div>{message}</div>
                </div>
            </CSSTransition>
        </>
    )
}

export default ErrorMsg

ErrorMsg.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
}
