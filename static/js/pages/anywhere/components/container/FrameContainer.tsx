import React, { ReactNode } from 'react'
import { Frame } from 'layouts'
import { IconAnywhereTypeEnum } from 'layouts/svgIcon/models/icon-type-enum'
import AnywhereIcon from 'layouts/svgIcon/anywhere'
import style from './Container.module.scss'

interface ContainerProps {
    children: ReactNode
    layoutWidth?: 'default' | 'narrow' | 'wide'
    logo?: boolean
}

const FrameContainer = ({
    children,
    layoutWidth,
    logo,
}: ContainerProps): JSX.Element => {
    const extraClass = style[layoutWidth] ? style[layoutWidth] : ''
    return (
        <Frame className={`${style.container} ${extraClass}`}>
            {logo && (
                <AnywhereIcon
                    icon={IconAnywhereTypeEnum.Logo}
                    className={style.logo}
                />
            )}
            {children}
        </Frame>
    )
}

FrameContainer.defaultProps = {
    layoutWidth: 'default',
    logo: false,
}

export default FrameContainer
