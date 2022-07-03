import React, { ReactNode } from 'react'
import { Container } from 'layouts/common'
import Icon from 'layouts/font-awesome'
import style from './AlertMessage.module.scss'

interface Props {
    children: ReactNode
    container?: boolean
    error?: boolean
    warning?: boolean
    success?: boolean
    info?: boolean
    className?: string
}

const AlertMessage = ({
    children,
    container,
    error,
    warning,
    success,
    info,
    className,
}: Props): JSX.Element => {
    const combinedClassName = style('alert', className, {
        error: error || (!warning && !success && !info),
        warning,
        success,
        info,
    })

    let iconType = 'times'
    if (warning) iconType = 'exclamation-triangle'
    if (success) iconType = 'envelope'
    if (info) iconType = 'info-circle'

    const alertBox = (
        <div className={combinedClassName}>
            <div className={style.icon}>
                <Icon fixedWidth name={iconType} />
            </div>
            <div>{children}</div>
        </div>
    )

    if (container) return <Container>{alertBox}</Container>

    return alertBox
}

export default AlertMessage

