import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import { isClient } from 'config/web'
import { Icon } from 'layouts'
import style from './Modal.scss'

if (isClient) {
    const root = document.getElementById('root')
    if (root) {
        ReactModal.setAppElement('#root')
    }
}

const Modal = ({
    isOpen,
    hide,
    children,
    closeOnOverlayClick = true,
    darkTheme = false,
    darkSmall = false,
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={hide}
            overlayClassName={classNames(style.overlay, {
                [style.dark]: darkTheme,
            })}
            className={classNames(
                style.modal,
                { [style.dark]: darkTheme },
                { [style.darkSmall]: darkSmall }
            )}
            closeTimeoutMS={300}
            shouldCloseOnOverlayClick={closeOnOverlayClick}
        >
            <button
                onClick={hide}
                className={classNames(style.close, { [style.dark]: darkTheme })}
            >
                {darkTheme ? (
                    <Icon light name="times" className={style.light} />
                ) : (
                    <Icon solid name="times-hexagon" />
                )}
            </button>
            {children}
        </ReactModal>
    )
}

export default Modal

Modal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    hide: PropTypes.func,
    closeOnOverlayClick: PropTypes.bool,
}
