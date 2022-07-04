import React from 'react'
import { Link } from 'features'
import LinkType from 'models/types/ts/linkPathType'
import { Icon } from 'layouts'
import style from './ArchiveButton.module.scss'

interface Props {
    className?: string
    buttonText?: string
    path?: LinkType
}

const ArchiveButton: React.FunctionComponent<Props> = ({
    className,
    buttonText,
    path,
}): JSX.Element => (
    <div className={style(style.link, className)}>
        <Link path={path}>
            {buttonText}
            <Icon name="chevron-right" light />
        </Link>
    </div>
)

export default ArchiveButton

